# 🚑 RAG Medical Chatbot

A Retrieval-Augmented Generation (RAG) medical chatbot that retrieves relevant medical context and generates grounded responses using an LLM workflow.

## Overview

This project explores how Retrieval-Augmented Generation can improve medical question answering by combining:

- semantic embeddings
- vector retrieval
- context-aware generation
- modular retrieval pipelines

Instead of relying only on an LLM’s memory, the system retrieves relevant medical information before generating responses.

---
## 🚀 Live Demo

https://cws6o4shmewd8seapnb4ru.streamlit.app/

## Tech Stack

- Python
- RAG Pipeline
- Embeddings
- Vector Store
- Retrieval Workflows
- LLM Integration

---

## Project Structure

txt rag-medical-chatbot/ │── app.py                # Main application │── chatbot.py            # Chatbot orchestration │── data_loader.py        # Medical document loading │── embedder.py           # Embedding generation │── retriever.py          # Retrieval logic │── vector_store.py       # Vector database handling │── requirements.txt │── README.md 

---

## Features

✔️ Medical document retrieval  
✔️ Embedding-based semantic search  
✔️ Context-aware response generation  
✔️ Modular RAG architecture  
✔️ Separated retrieval + generation workflow

---

## Installation

bash git clone <repo-url> cd rag-medical-chatbot pip install -r requirements.txt 

## Run

bash python app.py 

---

## Future Improvements

- Streamlit deployment
- FAISS / ChromaDB integration
- Better retrieval evaluation
- Multi-document support
- Improved UI

  ## Screenshots
  <img width="1440" height="820" alt="Screenshot 2026-06-02 at 1 01 35 PM" src="https://github.com/user-attachments/assets/969e381a-9d70-4176-b475-bc5b11b7e1aa" />
  <img width="1437" height="815" alt="Screenshot 2026-06-02 at 1 02 20 PM" src="https://github.com/user-attachments/assets/405689d4-4ed3-4bdf-b8ef-f48100d07811" />
<img width="1434" height="818" alt="Screenshot 2026-06-02 at 1 02 42 PM" src="https://github.com/user-attachments/assets/eb09ffdf-4f5f-4840-af25-d7b60a94d645" />


