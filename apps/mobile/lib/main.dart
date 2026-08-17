import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';
import 'core/constants/app_colors.dart';
import 'features/auth/data/auth_repository.dart';
import 'features/auth/presentation/bloc/auth_bloc.dart';
import 'features/auth/presentation/bloc/auth_event.dart';
import 'features/auth/presentation/bloc/auth_state.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/dashboard/presentation/pages/main_navigation_page.dart';
import 'features/harvest/data/models/harvest_log_local.dart';
import 'features/harvest/data/models/cached_master.dart';
import 'features/sync/data/pending_sync_queue.dart';
import 'features/harvest/data/repositories/harvest_repository.dart';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'core/network/dio_client.dart';
import 'features/sync/data/sync_remote_datasource.dart';
import 'features/sync/presentation/bloc/sync_bloc.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await dotenv.load(fileName: ".env.development");
  } catch (_) {
    // Fallback jika asset .env belum terbaca
  }
  final dir = await getApplicationDocumentsDirectory();
  final isar = await Isar.open(
    [LocalHarvestLogSchema, PendingSyncQueueSchema, CachedBlockSchema, CachedTPHSchema],
    directory: dir.path,
    name: 'sawitgo_field_db',
  );

  final harvestRepository = HarvestRepository(isar);
  final authRepository = AuthRepository();
  final syncRemoteDataSource = SyncRemoteDataSource(DioClient.instance.dio);
  final connectivity = Connectivity();

  runApp(
    MultiRepositoryProvider(
      providers: [
        RepositoryProvider.value(value: harvestRepository),
        RepositoryProvider.value(value: authRepository),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider(
            create: (context) => AuthBloc(authRepository: authRepository)..add(const AuthCheckRequested()),
          ),
          BlocProvider(
            create: (context) => SyncBloc(
              isar: isar,
              remoteDataSource: syncRemoteDataSource,
              connectivity: connectivity,
            ),
          ),
        ],
        child: SawitGoApp(harvestRepository: harvestRepository),
      ),
    ),
  );
}

class SawitGoApp extends StatelessWidget {
  final HarvestRepository harvestRepository;

  const SawitGoApp({super.key, required this.harvestRepository});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SawitGO Lapangan',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primaryEmerald,
          primary: AppColors.primaryEmerald,
          surface: AppColors.backgroundDark,
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: AppColors.backgroundDark,
        useMaterial3: true,
      ),
      home: BlocBuilder<AuthBloc, AuthState>(
        builder: (context, state) {
          if (state is AuthAuthenticated) {
            return MainNavigationPage(
              harvestRepository: harvestRepository,
              user: state.user,
            );
          } else if (state is AuthLoading) {
            return const Scaffold(
              backgroundColor: AppColors.backgroundDark,
              body: Center(
                child: CircularProgressIndicator(
                  color: AppColors.primaryEmerald,
                ),
              ),
            );
          } else {
            return const LoginPage();
          }
        },
      ),
    );
  }
}
