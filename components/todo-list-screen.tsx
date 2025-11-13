import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./button";
import Ionicons from '@expo/vector-icons/Ionicons';
import TodoList, { Todo } from "./todo-list";
import { useRef, useState } from "react";

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function TodoListScreen() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null);
  const inputRef = useRef<TextInput | null>(null);
  
  const addTodo = () => {
    const trimmed = input.trim()
    if(!trimmed) return

    if(editingId) {
      setTodos((prev) => 
        prev.map((t) => t.id === editingId ? { ...t, text: trimmed }: t)
      )
      setEditingId(null);
      setInput("");
      return;
    }
    const todo: Todo = {
      id: makeId(),
      text: trimmed,
      done: false
    }
    setTodos((prev) => [...prev, todo])
    setInput("")
  }
  
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }
  
  const handleToggle = (id: string) => {
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done }: t))
  }

  const handleEdit = (id: string) => {
    const todo = todos.find((t) => t.id === id)
    if(!todo) return
    
    setEditingId(id)
    setInput(todo.text)

    setTimeout(() => inputRef.current?.focus(), 50)
  }
  
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Todo List</Text>
        <TodoList 
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
          todos={todos}
          className="flex-1"
        />
        <View className="flex-row gap-2 mt-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg p-3"
            placeholder="Add Todo..."
            onChangeText={setInput}
            value={input}
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <Button onPress={addTodo} className="bg-blue-500 rounded-lg p-3 justify-center items-center">
            <Ionicons name="add" size={24} color="white" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}