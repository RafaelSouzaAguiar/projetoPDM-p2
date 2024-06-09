import { useState } from 'react';

import { 
  FlatList,
  Image,
  Pressable,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

interface Imagem{
  id: string;
  url: string;
}

export default function App() {
  const [imagens, setImagens] = useState<Imagem[]>([])

const gerar = () => {
  const novaImagem: Imagem = {
    id: '1',
    url: 'https://reactnative.dev/img/tiny_logo.png'
  }

  setImagens(imagensAtual => [
    novaImagem,
    ...imagensAtual
  ])
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo ao busca gatos! Clique no botão abaixo para gerar imagens de gatos</Text>
      <Pressable 
        style={styles.pressable}
        onPress={gerar}>
          <Text style={styles.pressableText}>Buscar Gatos</Text>
      </Pressable>
      <FlatList
        data={imagens}
        renderItem={imagem => (
          <Image
            style={styles.image} 
            source={{
              uri: imagem.item.url
            }}/>
        )}>

      </FlatList>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable:{
    backgroundColor: 'blue',
    width: '80%',
    padding: 8,
    borderRadius: 4,
    margin: 8
  },
  pressableText: {
    color: 'white',
    textAlign: 'center'
  },
  title:{
    marginTop: 20,
    textAlign: 'center'
  },
  image: {
    width: 60,
    height: 60,
  },
});
