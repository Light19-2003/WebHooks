import 'package:flutter/material.dart';

class ChatUiScreen extends StatelessWidget {
  const ChatUiScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Chat UI')),

      // body area (messages will go here later)
      body: const Center(child: Text('Messages go here...')),

      // bottom chat input bar
      bottomSheet: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 6.0),
          child: Row(
            children: [
              // TextField for message input
              Expanded(
                child: TextField(
                  decoration: InputDecoration(
                    hintText: 'Send a message...',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 10,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),

              // Send button
              IconButton(
                icon: const Icon(Icons.send, color: Colors.blue),
                onPressed: () {
                  // send message logic here
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
