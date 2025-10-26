<template>
  <div class="ledger-list-page">
    <div class="glass-card">
      <div class="header">
        <h2 class="title">账单明细</h2>
        <router-link to="/ledger-add" class="add-button">
          <!-- SVG加号图标 -->
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </router-link>
      </div>

      <!-- 筛选器 -->
      <div class="filters">
        <select v-model="selectedMonth" class="ios-select">
          <option v-for="month in months" :key="month.value" :value="month.value">
            {{ month.label }}
          </option>
        </select>

        <select v-model="selectedCategory" class="ios-select">
          <option value="all">全部分类</option>
          <option value="收入">收入</option>
          <option value="餐饮">餐饮</option>
          <option value="交通">交通</option>
          <option value="购物">购物</option>
          <option value="娱乐">娱乐</option>
          <option value="其他">其他</option>
        </select>
      </div>

      <!-- 月度统计 -->
      <div class="month-stats">
        <div class="stat-item">
          <span class="stat-label">总收入</span>
          <span class="stat-value income">¥{{ monthlyStats.income.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">总支出</span>
          <span class="stat-value expense">¥{{ monthlyStats.expense.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">结余</span>
          <span class="stat-value balance">¥{{ monthlyStats.balance.toFixed(2) }}</span>
        </div>
      </div>

      <!-- 交易列表 -->
      <div class="transaction-list">
        <div v-if="groupedTransactions.length === 0" class="empty-state">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <p>暂无交易记录</p>
          <router-link to="/ledger-add" class="add-link">记一笔</router-link>
        </div>

        <div v-else>
          <div v-for="group in groupedTransactions" :key="group.date" class="day-group">
            <div class="day-header">
              <span class="day-date">{{ formatDate(group.date) }}</span>
              <span class="day-total">
                收入: ¥{{ group.dayIncome.toFixed(2) }} · 支出: ¥{{ group.dayExpense.toFixed(2) }}
              </span>
            </div>

            <div v-for="item in group.items" :key="item.id" class="transaction-item">
              <div class="item-left">
                <div
                  class="category-badge"
                  :class="item.category === '收入' ? 'income' : 'expense'"
                >
                  {{ item.category }}
                </div>
                <div class="item-info">
                  <div class="note">{{ item.note || '无备注' }}</div>
                  <div class="time">{{ formatTime(item.time) }}</div>
                </div>
              </div>
              <div class="amount" :class="item.category === '收入' ? 'income' : 'expense'">
                {{ item.category === '收入' ? '+' : '-' }}¥{{ item.amount.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLedgerStore } from '@/stores/ledger'

const ledgerStore = useLedgerStore()

// 筛选条件
const selectedMonth = ref(getCurrentMonth())
const selectedCategory = ref('all')

// 从store获取交易记录
// 添加空值检查
const transactions = computed(() => {
  const storeTransactions = ledgerStore.getTransactions
  return Array.isArray(storeTransactions) ? storeTransactions : []
})

// 月份选项
const months = computed(() => {
  const current = new Date()
  const result = []

  for (let i = 0; i < 6; i++) {
    const date = new Date(current.getFullYear(), current.getMonth() - i, 1)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    result.push({
      value: `${year}-${month.toString().padStart(2, '0')}`,
      label: `${year}年${month}月`,
    })
  }

  return result
})

// 获取当前月份
function getCurrentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
}

// 过滤后的交易记录
const filteredTransactions = computed(() => {
  let filtered = transactions.value.filter((item) => {
    const itemMonth = item.date.substring(0, 7)
    return itemMonth === selectedMonth.value
  })

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter((item) => item.category === selectedCategory.value)
  }

  // 按日期和时间倒序排列
  return filtered.sort((a, b) => {
    if (a.date !== b.date) {
      return new Date(b.date) - new Date(a.date)
    }
    return b.time.localeCompare(a.time)
  })
})

// 按日期分组
const groupedTransactions = computed(() => {
  const groups = {}

  filteredTransactions.value.forEach((item) => {
    if (!groups[item.date]) {
      groups[item.date] = {
        date: item.date,
        items: [],
        dayIncome: 0,
        dayExpense: 0,
      }
    }

    groups[item.date].items.push(item)

    if (item.category === '收入') {
      groups[item.date].dayIncome += item.amount
    } else {
      groups[item.date].dayExpense += item.amount
    }
  })

  // 转换为数组并按日期倒序排列
  return Object.values(groups).sort((a, b) => new Date(b.date) - new Date(a.date))
})

// 月度统计
const monthlyStats = computed(() => {
  const income = filteredTransactions.value
    .filter((item) => item.category === '收入')
    .reduce((sum, item) => sum + item.amount, 0)

  const expense = filteredTransactions.value
    .filter((item) => item.category !== '收入')
    .reduce((sum, item) => sum + item.amount, 0)

  const balance = income - expense

  return { income, expense, balance }
})

// 格式化日期显示
function formatDate(dateStr) {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return '今天'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨天'
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
}

// 格式化时间显示
function formatTime(timeStr) {
  return timeStr
}
</script>

<style scoped>
.ledger-list-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.glass-card {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.add-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #007aff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 18px;
}

.filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.ios-select {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  color: #1d1d1f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

.month-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.5);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
}

.income {
  color: #34c759;
}

.expense {
  color: #ff3b30;
}

.balance {
  color: #007aff;
}

.day-group {
  margin-bottom: 24px;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
}

.day-date {
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
}

.day-total {
  font-size: 12px;
  color: #666;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.category-badge.income {
  background: #d8f3e4;
  color: #1a7f42;
}

.category-badge.expense {
  background: #ffe6e6;
  color: #d70015;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.note {
  font-size: 16px;
  font-weight: 500;
  color: #1d1d1f;
}

.time {
  font-size: 13px;
  color: #666;
  margin-top: 2px;
}

.amount {
  font-size: 16px;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}
</style>
