export interface CardConfig {
  value: number;
  displayValue: string;
  color: string;
}
export const fibonacciCards: CardConfig[] = [
  { value: 1, displayValue: '1', color: '#9EC8FE' },
  { value: 2, displayValue: '2', color: '#9EC8FE' },
  { value: 3, displayValue: '3', color: '#A3DFF2' },
  { value: 5, displayValue: '5', color: '#A3DFF2' },
  { value: 8, displayValue: '8', color: '#9DD49A' },
  { value: 13, displayValue: '13', color: '#9DD49A' },
  { value: 20, displayValue: '20', color: '#F4DD94' },
  { value: 40, displayValue: '40', color: '#F4DD94' },
  { value: -1, displayValue: '❓', color: '#F4DD94'},
];

export const getRandomEmoji = () => {
    const emojis = ['☕', '🥤', '🍹', '🍸', '🍧', '🍨', '🍩', '🍎', '🧁', '🍪', '🍿', '🌮', '🍦', '🍉', '🍐', '🍰', '🍫'];
    return emojis[Math.floor(Math.random() * emojis.length)];
};