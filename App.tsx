import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Switch, Image, Pressable,TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {

  const frases = ["Dica: faça uma breve pausa!", "Lembrete: Hidrate-se!", "Respire fundo e continue!"]
  const [bio, setBio] = useState("n sei")
  const [bioEditada, setBioEditada] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showNotifation, setShowNotification] = useState(false)
  const [fraseAtual, setFraseAtual] = useState(0)

  function salvarBio(){
     alert("Bio atualizada!") 
    setBio(bioEditada)
     setShowModal(false)
   
   
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseAtual(fraseAtual + 1)
      if (fraseAtual == frases.length - 1) {
        setFraseAtual(0)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [showNotifation, fraseAtual])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} >

          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <Image source={require('./assets/icon.png')} style={{ width: 120, height: 120 }} />
              <Text style={styles.title}>Rian Barbosa Rampinelli</Text>
            </View>

            <View style={styles.main}>
              <View style={styles.containerBio}>
                <Text style={{ fontWeight: "bold" }}>Bio</Text>
                <View style={styles.bio}>
                  <Text>
                    {bio}
                  </Text>
                </View>
                <Pressable onPress={() => {
                  setShowModal(true)  
                  setBioEditada(bio)}} 
                  style={styles.buttonBio}>
                  <Text style={styles.buttonText}>Editar bio</Text>
                </Pressable>
              </View>

              <View style={styles.containerNotification}>
                <Text style={{ fontWeight: "bold" }}>
                  Configurações
                </Text>

                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                  <Text>
                    Receber notificações
                  </Text>
                  <Switch
                    value={showNotifation}
                    onValueChange={setShowNotification}
                  />
                </View>
              </View>

              <Pressable style={styles.buttonSave} onPress={() => alert("Dados salvos com sucesso!")}>
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
            </View>

            {showNotifation && (
              <View style={styles.containerMensagem}>
                <Text style={{ color: "white" }}>
                  {frases[fraseAtual]}
                </Text>
              </View>
            )}

            {showModal && (
              <View style={styles.backgroundModal}>
                <View style={styles.containerModal}>
                  <Text style={{ fontWeight: "bold" }}>Editar Bio</Text>
                  <View style={styles.bio}>
                    <TextInput onChangeText={setBioEditada} value={bioEditada}></TextInput>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: 'flex-end', gap: 10 }}>
                     <Pressable onPress={() => setShowModal(false)} style={styles.buttonCancel}>
                      <Text style={styles.buttonTextCancel}>Cancelar</Text>
                    </Pressable>
                    <Pressable  onPress={()=>{salvarBio()}}  style={styles.buttonBio}>
                      <Text style={styles.buttonText}>Salvar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    minHeight: "100%"
  },
  title: {
    fontWeight: "bold",
    fontSize: 18
  },
  main: {
    marginTop: 30,
    gap: 20,
    flexGrow: 1,
  },
  containerBio: {
    backgroundColor: "white",
    width: 350,
    padding: 12,
    borderRadius: 12,
    gap: 10
  },
  containerModal: {
    backgroundColor: "white",
    width: 350,
    padding: 12,
    borderRadius: 12,
    gap: 10,

  },
  containerNotification: {
    backgroundColor: "white",
    width: 350,
    padding: 12,
    borderRadius: 12,
    gap: 10
  },
  bio: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
    paddingRight: 30,
    minHeight: 90,
    paddingLeft: 6,
  },
  buttonBio: {
    width: 100,
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSave: {
    width: 350,
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonCancel: {
    width: 100,
    backgroundColor:"#E5E5E5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonTextCancel: {
    color: "black",
    fontWeight: "bold",
  },
  containerMensagem: {
    width: 350,
    backgroundColor: "black",
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  backgroundModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop:80,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
