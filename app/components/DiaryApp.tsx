import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry, editEntry, deleteEntry } from '../store/diarySlice';

const DiaryApp = () => {
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [newText, setNewText] = useState('');
  const dispatch = useDispatch();
  const entries = useSelector((state: any) => state.diary.entries);

  const addNewEntry = () => {
    const newEntry = `Entry at ${new Date().toLocaleString()}`;
    dispatch(addEntry(newEntry));
  };

  const startEditing = (id: string, text: string) => {
    setEditingEntryId(id);
    setNewText(text);
  };

  const saveEdit = () => {
    if (editingEntryId !== null) {
      dispatch(editEntry({ id: editingEntryId, newText }));
      setEditingEntryId(null);
      setNewText('');
    }
  }; 

  const deleteEntryHandler = (id: string) => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => dispatch(deleteEntry(id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add New Entry" onPress={addNewEntry} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            {editingEntryId === item.id ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={newText}
                  onChangeText={setNewText}
                  placeholder="Edit your entry"
                />
                <Button title="Save" onPress={saveEdit} />
              </View>
            ) : (
              <View>
                <Text style={styles.entry}>{item.text}</Text>
                <Button title="Edit" onPress={() => startEditing(item.id, item.text)} />
                <Button title="Delete" color="red" onPress={() => deleteEntryHandler(item.id)} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  entryContainer: {
    marginBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
    backgroundColor: '#f9f9f9', // Light background for each entry
    borderRadius: 5,
    padding: 10,
  },
  entry: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default DiaryApp;
