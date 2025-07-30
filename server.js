const express = require("express");
const fs = require("fs");
const app = express();
let contact = require("./contact.json");

app.use(express.json()); // Middleware to parse JSON request bodies

// GET all contacts
app.get("/api/contact", function (req, res) {
  res.json(contact);
});

// CREATE a new contact
app.post("/api/add-contact", function (req, res) {
  const newContact = req.body;

  if (!newContact.id || !newContact.name || !newContact.email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  contact.push(newContact);
  res.status(201).json({ message: "Contact added", contact: newContact });
});

// UPDATE a contact
app.put("/api/update-contact/:id", function (req, res) {
  const contactId = req.params.id;
  const updatedData = req.body;

  const index = contact.findIndex(c => c.id == contactId);
  if (index === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  contact[index] = { ...contact[index], ...updatedData };
  res.json({ message: "Contact updated", contact: contact[index] });
});

// DELETE a contact
app.delete("/api/delete-contact/:id", function (req, res) {
  const contactId = req.params.id;
  const index = contact.findIndex(c => c.id == contactId);
  if (index === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const removed = contact.splice(index, 1);
  res.json({ message: "Contact deleted", contact: removed[0] });
});

app.listen(5000, function () {
  console.log(`Server running at http://localhost:2000`);
}); 