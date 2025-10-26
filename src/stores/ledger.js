import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export const useLedgerStore = () => {
  // 使用本地存储持久化数据
  const transactions = useStorage('ledger-transactions', [])

  // 添加交易记录
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(), // 使用时间戳作为ID
      ...transaction,
      date: transaction.date || formatDate(new Date()),
      time: transaction.time || formatTime(new Date()),
    }
    transactions.value.unshift(newTransaction)
  }

  // 获取所有交易记录
  const getTransactions = computed(() => transactions.value)

  // 根据ID获取交易记录
  const getTransactionById = (id) => {
    return transactions.value.find((t) => t.id === id)
  }

  // 删除交易记录
  const deleteTransaction = (id) => {
    const index = transactions.value.findIndex((t) => t.id === id)
    if (index > -1) {
      transactions.value.splice(index, 1)
    }
  }

  // 日期时间格式化辅助函数
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5)
  }

  return {
    transactions,
    addTransaction,
    getTransactions,
    getTransactionById,
    deleteTransaction,
  }
}
