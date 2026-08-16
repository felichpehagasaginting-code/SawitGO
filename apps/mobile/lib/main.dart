import 'package:flutter/material.dart';
import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';
import 'core/constants/app_colors.dart';
import 'features/harvest/data/models/harvest_log_local.dart';
import 'features/harvest/data/models/cached_master.dart';
import 'features/sync/data/pending_sync_queue.dart';
import 'features/harvest/data/repositories/harvest_repository.dart';
import 'features/harvest/presentation/pages/harvest_input_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final dir = await getApplicationDocumentsDirectory();
  final isar = await Isar.open(
    [LocalHarvestLogSchema, PendingSyncQueueSchema, CachedBlockSchema, CachedTPHSchema],
    directory: dir.path,
    name: 'sawitgo_field_db',
  );

  final harvestRepository = HarvestRepository(isar);

  runApp(SawitGoApp(harvestRepository: harvestRepository));
}

class SawitGoApp extends StatelessWidget {
  final HarvestRepository harvestRepository;

  const SawitGoApp({super.key, required this.harvestRepository});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SawitGO',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.primaryEmerald,
          primary: AppColors.primaryEmerald,
          surface: AppColors.backgroundDark,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: HarvestInputPage(repository: harvestRepository),
    );
  }
}
