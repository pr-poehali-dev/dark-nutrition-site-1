import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Whey Protein Premium',
    category: 'Протеин',
    price: 2499,
    image: 'https://cdn.poehali.dev/projects/8ee07d39-d4ed-444d-a8c6-067d201c38b4/files/8e17eb91-4fc7-4e2a-9b2e-e0495f7f09e2.jpg',
    description: 'Высококачественный сывороточный протеин для роста мышц'
  },
  {
    id: 2,
    name: 'BCAA Complex',
    category: 'Аминокислоты',
    price: 1799,
    image: 'https://cdn.poehali.dev/projects/8ee07d39-d4ed-444d-a8c6-067d201c38b4/files/8f84abfe-f16e-4bbc-bced-c42291c6c1c7.jpg',
    description: 'Комплекс BCAA для восстановления мышц'
  },
  {
    id: 3,
    name: 'Pre-Workout Energy',
    category: 'Предтренировочные',
    price: 1999,
    image: 'https://cdn.poehali.dev/projects/8ee07d39-d4ed-444d-a8c6-067d201c38b4/files/4d6e417b-8e42-47ce-9b83-2efb9c23f905.jpg',
    description: 'Мощный энергетический комплекс перед тренировкой'
  },
  {
    id: 4,
    name: 'Creatine Monohydrate',
    category: 'Креатин',
    price: 1299,
    image: 'https://cdn.poehali.dev/projects/8ee07d39-d4ed-444d-a8c6-067d201c38b4/files/8e17eb91-4fc7-4e2a-9b2e-e0495f7f09e2.jpg',
    description: 'Чистый креатин моногидрат для силы и выносливости'
  },
  {
    id: 5,
    name: 'Omega-3 Fish Oil',
    category: 'Витамины',
    price: 899,
    image: 'https://cdn.poehali.dev/projects/8ee07d39-d4ed-444d-a8c6-067d201c38b4/files/8f84abfe-f16e-4bbc-bced-c42291c6c1c7.jpg',
    description: 'Рыбий жир премиум качества для здоровья'
  },
  {
    id: 6,
    name: 'Gainer Mass Pro',
    category: 'Гейнеры',
    price: 2799,
    image: 'https://cdn.poehali.dev/projects/8ee07d39-d4ed-444d-a8c6-067d201c38b4/files/4d6e417b-8e42-47ce-9b83-2efb9c23f905.jpg',
    description: 'Гейнер для быстрого набора массы'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: 'Товар добавлен',
      description: `${product.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Dumbbell" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">FITSTORE</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#" className="hover:text-primary transition-colors">О нас</a>
            <a href="#" className="hover:text-primary transition-colors">Доставка</a>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
          </nav>

          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <Icon name="ShoppingCart" size={20} />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-4">
              Спортивное питание<br />для достижения целей
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Профессиональные добавки для спортсменов и любителей фитнеса
            </p>
            <Button size="lg" className="text-lg px-8">
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Популярные товары</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-secondary/50 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {product.price} ₽
                    </span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                Доставим ваш заказ в течение 1-3 дней
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% оригинал</h3>
              <p className="text-muted-foreground">
                Только сертифицированная продукция
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Icon name="Headphones" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-muted-foreground">
                Всегда готовы помочь с выбором
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/20 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Dumbbell" size={24} className="text-primary" />
                <span className="font-bold text-lg">FITSTORE</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Профессиональное спортивное питание для достижения ваших целей
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Протеин</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Аминокислоты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Креатин</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Витамины</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@fitstore.ru</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 FITSTORE. Все права защищены.
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-2xl font-bold">Корзина</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain bg-secondary/50 rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.price} ₽
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{getTotalPrice()} ₽</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
