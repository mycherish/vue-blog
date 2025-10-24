<template>
  <div class="ledger-page">
    <!-- 模拟液态玻璃卡片 -->
    <div class="glass-card">
      <h2 class="title">记一笔</h2>

      <form @submit.prevent="handleSubmit" class="form">
        <!-- 类别 -->
        <div class="form-group">
          <label>类别</label>
          <select v-model="form.category" class="ios-select">
            <option value="收入">收入</option>
            <option value="餐饮">餐饮</option>
            <option value="交通">交通</option>
            <option value="购物">购物</option>
            <option value="娱乐">娱乐</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <!-- 金额 -->
        <div class="form-group">
          <label>金额（¥）</label>
          <input
            v-model.number="form.amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            class="ios-input"
          />
        </div>

        <!-- 备注 -->
        <div class="form-group">
          <label>备注（可选）</label>
          <input
            v-model="form.note"
            type="text"
            placeholder="例如：午餐、打车费..."
            class="ios-input"
          />
        </div>

        <!-- 时间 -->
        <div class="form-group">
          <label>时间</label>
          <input
            v-model="form.time"
            type="datetime-local"
            class="ios-input"
          />
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="ios-button">保存账目</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  category: '餐饮',
  amount: null,
  note: '',
  time: getCurrentDateTimeString() // 设置默认时间为当前时间
})

// 获取当前时间的字符串格式，用于 datetime-local
function getCurrentDateTimeString() {
  const now = new Date()
  // 转换为 YYYY-MM-DDTHH:mm 格式
  return now.toISOString().slice(0, 16)
}

const handleSubmit = () => {
  if (!form.amount || form.amount <= 0) {
    alert('请输入有效金额')
    return
  }
  console.log('提交账目:', { ...form })
  alert('记账成功！')
}
</script>

<style scoped>
.ledger-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.glass-card {
  width: 100%;
  max-width: 400px;
  padding: 28px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 28px;
  color: #1d1d1f;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.ios-input,
.ios-select {
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 17px;
  color: #1d1d1f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
}

.ios-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23888'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

:deep(.dp__input) {
  width: 100%;
  padding: 14px 16px !important;
  border: none !important;
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  font-size: 17px !important;
  color: #1d1d1f !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;
}

:deep(.dp__clear_icon),
:deep(.dp__action_row) {
  display: none;
}

.ios-button {
  width: 100%;
  padding: 16px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  margin-top: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.ios-button:active {
  background: #005ac8;
}
</style>
