import os
import nltk
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import pdfplumber
import docx

nltk.download("punkt")

app = Flask(__name__)
CORS(app)  # Allow requests from React

if __name__ == "__main__":
    # Load Pegasus model safely inside the main block
    summarizer = pipeline("summarization", model="google/pegasus-xsum")

    def extract_text_from_pdf(pdf_path):
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n" if page.extract_text() else ""
        return text.strip()

    def extract_text_from_docx(docx_path):
        doc = docx.Document(docx_path)
        return "\n".join([para.text for para in doc.paragraphs]).strip()

    def summarize_text(text, max_length=300):
        chunks = [text[i:i+512] for i in range(0, len(text), 512)]
        summaries = [summarizer(chunk, max_length=max_length, min_length=100, do_sample=False)[0]['summary_text'] for chunk in chunks]
        return "\n\n".join(f"Section {i+1}: {summary}" for i, summary in enumerate(summaries))

    @app.route('/summarize', methods=['POST'])
    def summarize_report():
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        filename = file.filename
        text = ""

        # Process file
        if filename.endswith(".pdf"):
            file_path = f"uploads/{filename}"
            file.save(file_path)
            text = extract_text_from_pdf(file_path)
        elif filename.endswith(".docx"):
            file_path = f"uploads/{filename}"
            file.save(file_path)
            text = extract_text_from_docx(file_path)
        elif filename.endswith(".txt"):
            text = file.read().decode("utf-8")
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        if not text:
            return jsonify({"error": "Failed to extract text"}), 500

        summary = summarize_text(text)
        return jsonify({"summary": summary})

    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True)
