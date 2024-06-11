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
  }

  const remover = (id: string) => {
    setImagens(imagensAtuais => imagensAtuais.filter(i => i.id !== id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao busca gatos!</Text>
      <Text style={styles.text}>Clique no botão abaixo para gerar 5 imagens gatos.</Text>

      <Pressable 
        style={styles.pressable}
        onPress={gerar}>
          <Text style={styles.pressableText}>Buscar Gatos</Text>
      </Pressable>

      <FlatList
        style={styles.imageList}
        data={imagens}
        keyExtractor={item => item.id}
        renderItem={imagem => (
          <View>
            <Image
              style={styles.image} 
              source={{
                uri: imagem.item.url
              }}/>
            <Pressable 
              style={styles.pressableRemover}
              onPress={() => remover(imagem.item.id)}>
                <Text style={styles.pressableText}>Remover este gato</Text>
            </Pressable>
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
  text:{
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
  pressableRemover:{
    backgroundColor: 'red',
    width: '95%',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginBottom: 10
  },
  pressableText: {
    color: 'white',
    textAlign: 'center'
  },
  
  imageList:{
    width: '80%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
    marginBottom: 8
  },
  image: {
    margin: 8,
    width: '95%',
    aspectRatio: 1,
  },
});