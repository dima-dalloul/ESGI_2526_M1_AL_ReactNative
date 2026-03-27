import { AppState, FlatList, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

const QUOTES = [
  { id: '0', text: "ic parvis magna.", author: 'Uncharted - Lucas' },
  { id: '1', text: "Vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres. Des gens qui m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où j’étais seul chez moi. Et c’est assez curieux de se dire que les hasards, les rencontres forgent une destinée... Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l’interlocuteur en face je dirais, le miroir qui vous aide à avancer. Alors ça n’est pas mon cas, comme je disais là, puisque moi au contraire, j’ai pu ; et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... je ne suis qu’amour ! Et finalement, quand des gens me disent « Mais comment fais-tu pour avoir cette humanité ? », je leur réponds très simplement que c’est ce goût de l’amour, ce goût donc qui m’a poussé aujourd’hui à entreprendre une construction mécanique... mais demain qui sait ? Peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi", author: 'Lucas & Anis' },
  { id: '2', text: "Les cons, ça ose tout. C'est même à ça qu'on les reconnaît.", author: 'Édouard' },
  { id: '3', text: "Vous voulez un whisky ? — Oh, juste un doigt. — Vous voulez pas un whisky d'abord ?", author: 'Édouard' },
  { id: '4', text: "Il s'appelle Juste Leblanc. — Ah bon, il n'a pas de prénom ?", author: 'Édouard' },
  { id: '5', text: "Le monde se divise en deux catégories : ceux qui ont un pistolet chargé et ceux qui creusent. Toi, tu creuses.", author: 'Édouard' },
  { id: '6', text: "Tu vois, normalement, à la fin, c'est moi qui gagne. — C'est pas ma faute à moi si tu triches !", author: 'Dima' },
  { id: '7', text: "Yippee-ki-yay, pauvre con !", author: 'Édouard'},
  { id: '8', text: "E.T. téléphone maison", author: 'Édouard'},
  { id: '9', text: "la vie c'est comme une boîte de chocolats on ne sait jamais sur quoi on va tomber", author: 'Youenn'},
  { id: '10', text: "Winter is coming.", author: 'Evan'},
  { id: '11', text: 'There is no place like 127.0.0.1', author: 'Dima' },
  { id: '12', text: 'You shall not pass!', author: 'Dima' },
  { id: '13', text: 'T’as pas mourus l’âne t’as pas mourus - Shrek', author: 'Jérémy' },
  { id: '14', text: 'It’s a trap!', author: 'Dima' },
  { id: '15', text: 'Une politique astucieuse consiste à faire croire aux nations qu’elles sont libres. - Napoléon Bonaparte', author: 'Anis' },
  { id: '16', text: 'To be, or not to be, that is the question.', author: 'William Shakespeare' },
  { id: '17', text: "I think, therefore I am.", author: 'René Descartes' },
  { id: '18', text: 'The only thing we have to fear is fear itself.', author: 'Franklin D. Roosevelt' },
  { id: '19', text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
  { id: '20', text: "Hell is other people.", author: 'Jean-Paul Sartre' },
  { id: '21', text: 'One must imagine Sisyphus happy.', author: 'Albert Camus' },
  { id: '22', text: 'The unexamined life is not worth living.', author: 'Socrates' },
  { id: '23', text: "I know that I know nothing.", author: 'Socrates' },
  { id: '24', text: 'That which does not kill us makes us stronger.', author: 'Friedrich Nietzsche' },
  { id: '25', text: 'Man is born free, and everywhere he is in chains.', author: 'Jean-Jacques Rousseau' },
  { id: '26', text: "Science sans conscience n'est que ruine de l'âme.", author: 'François Rabelais' },
  { id: '27', text: 'The heart has its reasons which reason knows nothing of.', author: 'Blaise Pascal' },
  { id: '28', text: 'Imagination is more important than knowledge.', author: 'Albert Einstein' },
  { id: '29', text: "It is not the strongest that survive, nor the most intelligent, but the one most responsive to change.", author: 'Charles Darwin' },
  { id: '30', text: "I have a dream.", author: 'Martin Luther King Jr.' },
  { id: '31', text: "The only true wisdom is in knowing you know nothing.", author: 'Socrates' },
];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

let nextId = QUOTES.length;

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState(() => shuffle(QUOTES));
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  useFocusEffect(
    useCallback(() => {
      const subscription = AppState.addEventListener('change', (nextState) => {
        if (nextState === 'active') {
          setQuotes((prev) => shuffle(prev));
        }
      });
      return () => subscription.remove();
    }, [])
  );

  const addQuote = () => {
    const trimmedText = newText.trim();
    if (!trimmedText) return;
    const quote = {
      id: String(nextId++),
      text: trimmedText,
      author: newAuthor.trim() || 'Anonyme',
    };
    setQuotes((prev) => [quote, ...prev]);
    setNewText('');
    setNewAuthor('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>Famous Quotes</ThemedText>
      <ThemedView style={styles.form}>
        <Collapsible title="Ajouter une citation">
          <TextInput
            style={styles.input}
            placeholder="Votre citation..."
            placeholderTextColor="#999"
            value={newText}
            onChangeText={setNewText}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Auteur (optionnel)"
            placeholderTextColor="#999"
            value={newAuthor}
            onChangeText={setNewAuthor}
          />
          <Pressable style={styles.addButton} onPress={addQuote}>
            <ThemedText style={styles.addButtonText}>Ajouter</ThemedText>
          </Pressable>
        </Collapsible>
      </ThemedView>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <ThemedText style={styles.quoteText}>"{item.text}"</ThemedText>
            <ThemedText style={styles.author}>— {item.author}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  heading: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  author: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  form: {
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4a90d9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
