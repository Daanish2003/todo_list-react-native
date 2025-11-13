import { Checkbox, CheckboxProps } from 'expo-checkbox'
import React from 'react'
import { Text, View } from 'react-native'
import Button from './button'
import { Todo } from './todo-list'
import Ionicons from '@expo/vector-icons/Ionicons'

interface TodoListItemProps extends Omit<CheckboxProps, 'value' | 'onValueChange'> {
    todo: Todo
    onDelete: (id: string) => void
    onToggle: (id: string) => void
    onEdit: (id: string) => void
}

export default function TodoListItem({ todo, onDelete, onToggle, onEdit, ...checkboxProps }: TodoListItemProps) {
    return (
        <View className="flex-row items-center p-3 border border-gray-200 rounded-lg">
            <Checkbox
                {...checkboxProps}
                value={todo.done}
                onValueChange={() => onToggle(todo.id)}
                className="mr-3"
            />

            <Text className={`flex-1 text-base ${todo.done ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
            </Text>

            <Button
                onPress={() => onDelete(todo.id)}
                className="px-2 py-2 rounded mr-2"
            >
                <Ionicons name="trash-outline" size={20} color="red" />
            </Button>

            <Button
                onPress={() => onEdit(todo.id)}
                className="px-2 py-2 rounded"
            >
                <Ionicons name="create-outline" size={20} color="black" />
            </Button>
        </View>
    )
}
