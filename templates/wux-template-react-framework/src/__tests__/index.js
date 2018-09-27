import React, { Component } from '..'

describe('React', () => {
  test('React.createElement is function', () => {
    expect(typeof React.createElement).toBe('function')
  })

  test('React.Component is function', () => {
    expect(typeof React.Component).toBe('function')
  })
})

describe('React.Component', () => {
  test('React.Component is function', () => {
    expect(typeof Component).toBe('function')
  })
})
