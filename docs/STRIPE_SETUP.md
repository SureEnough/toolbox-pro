# Stripe 支付集成指南

## 架构

```
用户点击升级 → Paywall 组件 → createCheckoutSession()
  → POST /api/stripe/create-checkout-session (Cloudflare Function)
  → Stripe Checkout 页面 (信用卡/PayPal/支付宝)
  → 支付成功 → /payment/success?session_id=xxx
  → GET /api/stripe/session (验证支付状态)
  → 保存订阅到 localStorage → 升级为 Pro 用户

Stripe Webhook → POST /api/webhook/stripe
  → 验证签名 → 处理订阅事件 (激活/更新/取消)
```

## 配置步骤

### 1. 创建 Stripe 账户和产品

1. 注册 https://dashboard.stripe.com
2. **Products** → Create product
   - 月度订阅: $9.9/month → 记下 `price_xxx` (STRIPE_PRICE_MONTHLY)
   - 年度订阅: $79/year → 记下 `price_xxx` (STRIPE_PRICE_YEARLY)

### 2. 获取 API Keys

- **Developers** → **API keys**
  - Secret key: `sk_test_...` → STRIPE_SECRET_KEY
  - (Publishable key 不需要，使用 Checkout 模式)

### 3. 配置 Webhook

- **Developers** → **Webhooks** → **Add endpoint**
  - URL: `https://toolbox-pro-4lq.pages.dev/api/webhook/stripe`
  - Events:
    - `checkout.session.completed`
    - `customer.subscription.updated`
    - `customer.subscription.deleted`
    - `invoice.paid`
  - 记下 Signing secret: `whsec_...` → STRIPE_WEBHOOK_SECRET

### 4. 部署到 Cloudflare Pages

```bash
# 通过 wrangler 设置环境变量
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name=toolbox-pro
npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name=toolbox-pro
npx wrangler pages secret put STRIPE_PRICE_MONTHLY --project-name=toolbox-pro
npx wrangler pages secret put STRIPE_PRICE_YEARLY --project-name=toolbox-pro
```

### 5. 测试

使用 Stripe 测试卡:
- 卡号: `4242 4242 4242 4242`
- 过期: 任意未来日期
- CVC: 任意 3 位数字

## API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/stripe/create-checkout-session` | POST | 创建 Checkout Session |
| `/api/stripe/session` | GET | 获取 Session 详情 |
| `/api/stripe/portal` | POST | 打开客户管理门户 |
| `/api/webhook/stripe` | POST | Stripe Webhook 回调 |

## 文件结构

```
functions/
  api/
    stripe/
      create-checkout-session.js  # 创建支付会话
      session.js                  # 查询会话详情
      portal.js                   # 客户管理门户
    webhook/
      stripe.js                   # Webhook 处理
src/
  lib/
    stripe.ts                     # 前端支付服务
  pages/
    PaymentSuccess.tsx            # 支付成功页
    PaymentCancel.tsx             # 支付取消页
  components/
    layout/
      Paywall.tsx                 # 升级弹窗 (Stripe 集成)
  store/
    userStore.ts                  # 订阅状态管理
```
