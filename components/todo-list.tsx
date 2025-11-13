import React from 'react'
import { FlatList, View, type FlatListProps } from 'react-native'
import TodoListItem from './todo-list-item';

export type Todo = {
    id: string,
    text: string,
    done: boolean
}

interface TodoListProps extends Omit<FlatListProps<Todo>, "renderItem" | "data"> {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void
}


export default function TodoList({ todos, onToggle, onDelete, onEdit, ...flatListProps}: TodoListProps) {
  return (
    <FlatList 
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className='mb-2'>
          <TodoListItem 
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
          todo={item}
        />
        </View>
    )}
    {...flatListProps}
    />
  )
}
