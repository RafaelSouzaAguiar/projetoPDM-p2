import { useState } from 'react';
import { TheCatAPI } from '@thatapicompany/thecatapi';
import { API_KEY } from '@env'
import { 
  FlatList,
  Image,
  Pressable,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

const catApi = new TheCatAPI (API_KEY)

interface Imagem{
  id: string
  url: string
}

export default function App() {
  const [imagens, setImagens] = useState<Imagem[]>([])

  async function gerar() {
    const search = await catApi.images.searchImages({
      limit: 5,
    }).then(result => setImagens(imagensAtual => [
      ...result,
      ...imagensAtual
    ]))
    
    console.log(search)
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
          <View>
            <Image
              style={styles.image} 
              source={{
                uri: imagem.item.url
              }}/>
          </View>
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
  title:{
    marginTop: 20,
    textAlign: 'center'
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
  imageView:{
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
    marginBottom: 8
  },
  image: {
    margin: 8,
    width: 200,
    height: 200,
  },
});