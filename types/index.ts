/** 用户 */
export interface User {
  id: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

/** 猫咪 */
export interface Cat {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: '公' | '母';
  personality: string;
  description: string;
  image: string;
  available: boolean;
}

/** 预约记录 */
export interface Reservation {
  id: string;
  catId: string;
  catName: string;
  userId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

/** 商品 */
export interface Product {
  id: string;
  name: string;
  category: 'coffee' | 'dessert' | 'drink';
  price: number;
  description: string;
  image: string;
  tags?: string[];
  isSeckill?: boolean;
  seckillPrice?: number;
  seckillEnd?: string;
}

/** 购物车项 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** 留言 */
export interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
}

/** AI 聊天消息 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

/** AI 聊天会话 */
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}
