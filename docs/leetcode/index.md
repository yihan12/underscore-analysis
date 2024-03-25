---
title: 前言
author: 易函123
date: '2024-03-25'
---

## 1. leetcode 前言

前端学习，算法与数据结构必不可少。这篇文章，主要是博主刷 leetcod 的相关记录，以及算法与数据结构的学习笔记。该文涉及常用数据结构、排序算法、常用的算法以及前端手写编程题。

主要是为了形成算法思维，养成良好的算法思路。并将相应的数据处理运用到日常开发中。

希望会对大家有些帮助！！

## 2. 笔记内容

### 2.1 复杂度分析

#### 2.1.1 时间复杂度

**是什么？**

- 一个函数，用大 O 表示，比如 O(1)、O(n)、O(logN)...
- 定性描述该算法的时间

O(1)

```javascript
// O(1)
let i = 0
i += 1
```

O(n)

```javascript
// O(n)
for (let i = 0; i < n; i += 1) {
  console.log(i)
}
```

O(n)+O(1)=O(n)

```javascript
// O(n)+O(1)=O(n)
let i = 0
i += 1
for (let j = 0; j < n; j += 1) {
  console.log(j)
}
```

O(n)\*O(n)=O(n^2)

```javascript
// O(n)*O(n)=O(n^2)
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    console.log(i, j)
  }
}
```

O(n)\*O(n)=O(n^2)

```javascript
// O(n)*O(n)=O(n^2)
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    console.log(i, j)
  }
}
```

O(logN)

```javascript
// O(logN)
let i = 1
while (i > n) {
  console.log(i)
  i *= 2
}
```

### 2.2 常用数据结构

### 2.3 排序算法

### 2.4 查找算法

### 2.5 JavaScript 手写算法

### 2.6 五大常用算法

### 2.7 leetcode 刷题

## 3. 那就开始吧~

写作是一件十分枯燥的事情，如果我写的这些文字对你有些许帮助的话，还请赏个 star 哈~~
