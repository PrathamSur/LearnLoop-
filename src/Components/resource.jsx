import { useState, useEffect } from "react";
import { Download, Trash2, Edit3, PlusCircle } from "lucide-react";

const Resource = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("userNotes");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userNotes", JSON.stringify(notes));
  }, [notes]);

  // Add or update a note
  const handleAddNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = { title: newTitle, content: newContent };
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, { title: newTitle, content: newContent }]);
    }

    setNewTitle("");
    setNewContent("");
  };

  // Delete a note
  const handleDelete = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  // Edit a note
  const handleEdit = (index) => {
    setNewTitle(notes[index].title);
    setNewContent(notes[index].content);
    setEditIndex(index);
  };

  // Download note as .txt file
  const handleDownload = (note) => {
    const blob = new Blob([note.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${note.title || "note"}.txt`;
    link.click();
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Notes</h2>

      {/* Create / Edit Note */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editIndex !== null ? "Edit Note" : "Create a New Note"}
        </h3>
        <input
          type="text"
          placeholder="Note Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
        />
        <textarea
          placeholder="Write your note here..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md h-32"
        ></textarea>
        <button
          onClick={handleAddNote}
          className="mt-4 bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition"
        >
          <PlusCircle className="w-5 h-5" />
          {editIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-sm text-gray-600 h-24 overflow-y-auto">
              {note.content}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => handleEdit(i)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => handleDownload(note)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => handleDelete(i)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Resource;
