import 'package:flutter/material.dart';

class ExpansionTileControllerApp extends StatefulWidget {
  const ExpansionTileControllerApp({super.key});

  @override
  State<ExpansionTileControllerApp> createState() =>
      _ExpansionTileControllerAppState();
}

class _ExpansionTileControllerAppState
    extends State<ExpansionTileControllerApp> {
  final ExpansionTileController controller = ExpansionTileController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(useMaterial3: true),
      home: Scaffold(
          appBar: AppBar(title: const Text('ExpansionTileController Sample')),
          body: Column(
            children: [
              ExpansionTile(
                title: const Text('ExpansionTile with implicit controller.'),
                children: <Widget>[
                  Builder(
                    builder: (BuildContext context) {
                      return Container(
                        padding: const EdgeInsets.all(24),
                        alignment: Alignment.center,
                        child: ElevatedButton(
                          child: const Text('Collapse This Tile'),
                          onPressed: () {
                            return ExpansionTileController.of(context)
                                .collapse();
                          },
                        ),
                      );
                    },
                  ),
                ],
              ),
              ExpansionTile(
                title: const Text('ExpansionTile with implicit controller.'),
                children: <Widget>[
                  Builder(
                    builder: (BuildContext context) {
                      return Container(
                        padding: const EdgeInsets.all(24),
                        alignment: Alignment.center,
                        child: ElevatedButton(
                          child: const Text('Collapse This Tile'),
                          onPressed: () {
                            return ExpansionTileController.of(context)
                                .collapse();
                          },
                        ),
                      );
                    },
                  ),
                ],
              )
            ],
          )),
    );
  }
}
