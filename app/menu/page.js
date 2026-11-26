import MenuExperience from '../../components/menu/MenuExperience';
import menu from '../../public/data/menu.json';

export const metadata = {
  title: 'Menu',
  description:
    "Explore the Mama's Kitchen menu – Ethiopian and international dishes in Addis Ababa, including our signature ቋንጣ ፍርፍር (Quanta Firfir).",
  alternates: { canonical: '/menu' },
  openGraph: { title: "Menu | Mama's Kitchen", url: '/menu' },
};

export default function MenuPage() {
  return <MenuExperience initialData={menu} />;
}
