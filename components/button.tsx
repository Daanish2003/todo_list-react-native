import React from 'react'
import { Pressable, type PressableProps } from 'react-native'

interface ButtonProps extends PressableProps {
    children: React.ReactNode
}

export default function Button({ children, className, ...pressableProps }: ButtonProps) {
  return (
    <Pressable
        className={className}
        {...pressableProps}
    >
        {children}
    </Pressable>
  )
}