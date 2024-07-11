import 'dart:io'; // Add this import

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:morph/const/color.dart';

class Adminpanel extends StatefulWidget {
  const Adminpanel({super.key});

  @override
  State<Adminpanel> createState() => _AdminpanelState();
}

class _AdminpanelState extends State<Adminpanel> {
  List<PlatformFile> _pickedFiles = [];

  Future<void> _selectFile() async {
    final result = await FilePicker.platform.pickFiles();
    if (result != null) {
      setState(() {
        _pickedFiles.add(result.files.first);
      });
    }
  }

  void _deleteFile(int index) {
    setState(() {
      _pickedFiles.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: themecolor,
      appBar: AppBar(
        backgroundColor: listcolor,
        centerTitle: true,
        title: const Text(
          'ADMIN PANEL',
          style: TextStyle(color: titlecolor),
        ),
      ),
      body: Column(
        children: [
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              const Text(
                'Upload announcement:',
                style: TextStyle(color: titlecolor, fontSize: 18),
              ),
              GestureDetector(
                onTap: _selectFile,
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(color: FeatureColor),
                  ),
                  height: context.height * 0.12,
                  width: context.width * 0.25,
                  child: Center(
                    child: Icon(
                      Icons.add,
                      color: FeatureColor,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Text(
            "Your announement",
            style: TextStyle(color: Colors.amber, fontSize: 18),
          ),
          const Divider(),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 1,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: _pickedFiles.length,
              itemBuilder: (BuildContext context, int index) {
                final file = _pickedFiles[index];
                return Stack(
                  children: [
                    Positioned.fill(
                      child: Image.file(
                        File(file.path!),
                        fit: BoxFit.cover,
                      ),
                    ),
                    Positioned(
                      top: 8,
                      right: 8,
                      child: GestureDetector(
                        onTap: () => _deleteFile(index),
                        child: Container(
                          decoration: BoxDecoration(
                            color: titlecolor,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.delete,
                            color: const Color.fromARGB(255, 224, 5, 5),
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
