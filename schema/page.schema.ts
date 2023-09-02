import React from "react"

export type GenericObject = Record<string, any>
export type Props = GenericObject
export type Context = GenericObject
export type Product = GenericObject
export type Character = GenericObject

export interface ComponentProps {
  children?: React.ReactNode
}

export interface IServerContext {
  params?: GenericObject
  req?: GenericObject
  res?: GenericObject
}
