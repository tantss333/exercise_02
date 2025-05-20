import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const MessageListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { messages, title } = route.params;

  const [messageList, setMessageList] = useState<string[]>([]);
  const [readStatus, setReadStatus] = useState<boolean[]>([]);
  const [searchText, setSearchText] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem(`@${title}_messages`);
      const storedRead = await AsyncStorage.getItem(`@${title}_read`);

      const initialMessages = [...messages];
      const initialRead = initialMessages.map(() => false);

      setMessageList(stored ? JSON.parse(stored) : initialMessages);
      setReadStatus(storedRead ? JSON.parse(storedRead) : initialRead);
    } catch (e) {
      setMessageList([...messages]);
      setReadStatus(messages.map(() => false));
    }
  };

  const saveMessages = async (updatedList: string[], updatedRead: boolean[]) => {
    await AsyncStorage.setItem(`@${title}_messages`, JSON.stringify(updatedList));
    await AsyncStorage.setItem(`@${title}_read`, JSON.stringify(updatedRead));
  };

  const toggleRead = async (index: number) => {
    const updated = [...readStatus];
    updated[index] = !updated[index];
    setReadStatus(updated);
    await saveMessages(messageList, updated);
  };

  const deleteMessage = async (index: number) => {
    const confirm = Platform.OS === 'web'
      ? window.confirm('Are you sure you want to delete this message?')
      : true;

    if (!confirm) return;

    const updatedList = [...messageList];
    const updatedStatus = [...readStatus];
    updatedList.splice(index, 1);
    updatedStatus.splice(index, 1);
    setMessageList(updatedList);
    setReadStatus(updatedStatus);
    await saveMessages(updatedList, updatedStatus);
  };

  const markAllRead = async () => {
    const updated = messageList.map(() => true);
    setReadStatus(updated);
    await saveMessages(messageList, updated);
  };

  const addMessage = async () => {
    if (newMessage.trim() === '') return;
    const updatedList = [...messageList, newMessage.trim()];
    const updatedRead = [...readStatus, false];
    setMessageList(updatedList);
    setReadStatus(updatedRead);
    setNewMessage('');
    await saveMessages(updatedList, updatedRead);
  };

  const filteredMessages = messageList.filter((msg) =>
    msg.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={[styles.card, readStatus[index] && styles.cardRead]}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => toggleRead(index)} style={{ flex: 1 }}>
          <Text
            style={[styles.messageText, readStatus[index] && styles.readText]}
          >
            {item}
          </Text>
          <Text style={styles.helperText}>
            {readStatus[index] ? '✓ Read' : 'Tap to mark as read'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteMessage(index)} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={22} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007aff" />
        </TouchableOpacity>
        <Text style={styles.title}>{title} Messages</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markAll}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.addInput}
          placeholder="Type new message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.addButton} onPress={addMessage}>
          <Ionicons name="add-circle" size={28} color="#007aff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  markAll: { fontSize: 14, color: '#007aff' },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
  },
  list: { padding: 16 },
  card: {
    backgroundColor: '#cce8ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardRead: {
    backgroundColor: '#e2f1fb',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  readText: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
    marginRight: 8,
  },
  addButton: {
    padding: 4,
  },
});

export default MessageListScreen;
