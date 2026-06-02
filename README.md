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
