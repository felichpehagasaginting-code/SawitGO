import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/main.dart';

void main() {
  testWidgets('SawitGoApp smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const SawitGoApp());
    expect(find.text('SawitGO Mobile Scaffolding Ready'), findsOneWidget);
  });
}
