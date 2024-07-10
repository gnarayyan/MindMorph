import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:morph/const/color.dart';

class ReviewPage extends StatefulWidget {
  @override
  _ReviewPageState createState() => _ReviewPageState();
}

class _ReviewPageState extends State<ReviewPage> {
  List<Review> reviews = [];
  TextEditingController _reviewController = TextEditingController();
  final List<String> dummyUsernames = [
    'sobin',
    'gobin',
    'narayn ',
    'suraj',
  ];

  String getRandomUsername() {
    final random = Random();
    return dummyUsernames[random.nextInt(dummyUsernames.length)];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: context.height,
        color: themecolor,
        child: SingleChildScrollView(
          child: Column(
            children: [
              ListView.builder(
                shrinkWrap: true,
                physics: BouncingScrollPhysics(),
                itemCount: reviews.length,
                itemBuilder: (context, index) {
                  return ReviewWidget(
                    review: reviews[index],
                    onReplyAdded: (replyContent) {
                      setState(() {
                        reviews[index].replies.add(
                              Reply(
                                id: DateTime.now()
                                    .millisecondsSinceEpoch
                                    .toString(),
                                username: getRandomUsername(),
                                content: replyContent,
                              ),
                            );
                      });
                    },
                  );
                },
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextField(
                  controller: _reviewController,
                  style: TextStyle(color: FeatureColor),
                  decoration: InputDecoration(
                    hintText: 'Write a review...',
                    hintStyle: TextStyle(color: Colors.amber),
                    suffixIcon: IconButton(
                      icon: Icon(Icons.send),
                      onPressed: () {
                        if (_reviewController.text.isNotEmpty) {
                          setState(() {
                            reviews.add(
                              Review(
                                id: DateTime.now()
                                    .millisecondsSinceEpoch
                                    .toString(),
                                username: getRandomUsername(),
                                content: _reviewController.text,
                                replies: [],
                              ),
                            );
                            _reviewController.clear();
                          });
                        }
                      },
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class Review {
  final String id;
  final String username;
  final String content;
  final List<Reply> replies;

  Review(
      {required this.id,
      required this.username,
      required this.content,
      required this.replies});
}

class Reply {
  final String id;
  final String username;
  final String content;

  Reply({required this.id, required this.username, required this.content});
}

class ReviewWidget extends StatelessWidget {
  final Review review;
  final Function(String) onReplyAdded;

  ReviewWidget({required this.review, required this.onReplyAdded});

  @override
  Widget build(BuildContext context) {
    TextEditingController _replyController = TextEditingController();

    return Card(
      color: listcolor,
      margin: EdgeInsets.all(8.0),
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              review.content,
              style: TextStyle(
                fontSize: 16.0,
                color: FeatureColor,
              ),
            ),
            Text(
              '- ${review.username}',
              style: TextStyle(fontSize: 12.0, color: Colors.grey),
            ),
            SizedBox(height: 8.0),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: review.replies.map((reply) {
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        reply.content,
                        style: TextStyle(
                          color:
                              titlecolor, // Change this to your desired color
                        ),
                      ),
                      Text(
                        '- ${reply.username}',
                        style: TextStyle(fontSize: 12.0, color: Colors.grey),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
            SizedBox(height: 8.0),
            TextField(
              controller: _replyController,
              decoration: InputDecoration(
                hintText: 'Reply to this review...',
                hintStyle: TextStyle(color: titlecolor),
                fillColor: FeatureColor,
                suffixIcon: IconButton(
                  icon: Icon(Icons.send),
                  onPressed: () {
                    if (_replyController.text.isNotEmpty) {
                      onReplyAdded(_replyController.text);
                      _replyController.clear();
                    }
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
