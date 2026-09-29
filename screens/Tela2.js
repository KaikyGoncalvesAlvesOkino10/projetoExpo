import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

import { signOut } from 'firebase/auth';

import {
  ref,
  push,
  set,
  onValue,
  update,
  remove,
} from 'firebase/database';

import {
  auth,
  database,
} from '../firebaseConfig';

export default function Tela2({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const [contatos, setContatos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // =====================================================
  // READ - CARREGAR CONTATOS
  // =====================================================

  useEffect(() => {
    const contatosRef = ref(
      database,
      'contatos'
    );

    const unsubscribe = onValue(
      contatosRef,
      (snapshot) => {
        const dados = snapshot.val();

        if (dados) {
          const lista = Object.keys(dados).map(
            (id) => ({
              id: id,
              ...dados[id],
            })
          );

          setContatos(lista);
        } else {
          setContatos([]);
        }
      },
      (error) => {
        console.log(
          'ERRO AO BUSCAR CONTATOS:',
          error
        );

        setMensagem(
          'Erro ao carregar os contatos.'
        );
      }
    );

    return () => unsubscribe();

  }, []);


  // =====================================================
  // CREATE - CADASTRAR
  // =====================================================

  async function cadastrar() {
    setMensagem('');

    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim()
    ) {
      setMensagem(
        'Preencha todos os campos.'
      );

      return;
    }

    try {
      const contatosRef = ref(
        database,
        'contatos'
      );

      const novoContatoRef =
        push(contatosRef);

      await set(
        novoContatoRef,
        {
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
        }
      );

      setMensagem(
        'Contato cadastrado com sucesso!'
      );

      limparCampos();

    } catch (error) {
      console.log(
        'ERRO AO CADASTRAR:',
        error
      );

      setMensagem(
        'Erro ao cadastrar o contato.'
      );
    }
  }


  // =====================================================
  // EDITAR
  // =====================================================

  function editar(contato) {
    setNome(contato.nome);
    setEmail(contato.email);
    setTelefone(contato.telefone);

    setIdEditando(contato.id);

    setMensagem(
      'Edite os dados e clique em Salvar alterações.'
    );
  }


  // =====================================================
  // UPDATE - SALVAR EDIÇÃO
  // =====================================================

  async function salvarEdicao() {
    setMensagem('');

    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim()
    ) {
      setMensagem(
        'Preencha todos os campos.'
      );

      return;
    }

    try {
      const contatoRef = ref(
        database,
        `contatos/${idEditando}`
      );

      await update(
        contatoRef,
        {
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
        }
      );

      setMensagem(
        'Contato atualizado com sucesso!'
      );

      limparCampos();

    } catch (error) {
      console.log(
        'ERRO AO ATUALIZAR:',
        error
      );

      setMensagem(
        'Erro ao atualizar o contato.'
      );
    }
  }


  // =====================================================
  // DELETE - EXCLUIR
  // =====================================================

  async function excluir(id) {
    try {
      const contatoRef = ref(
        database,
        `contatos/${id}`
      );

      await remove(contatoRef);

      setMensagem(
        'Contato excluído com sucesso!'
      );

      if (idEditando === id) {
        limparCampos();
      }

    } catch (error) {
      console.log(
        'ERRO AO EXCLUIR:',
        error
      );

      setMensagem(
        'Erro ao excluir o contato.'
      );
    }
  }


  // =====================================================
  // LIMPAR CAMPOS
  // =====================================================

  function limparCampos() {
    setNome('');
    setEmail('');
    setTelefone('');
    setIdEditando(null);
  }


  // =====================================================
  // CANCELAR EDIÇÃO
  // =====================================================

  function cancelarEdicao() {
    limparCampos();
    setMensagem('');
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  async function sair() {
    try {
      await signOut(auth);

      navigation.navigate('Tela1');

    } catch (error) {
      console.log(
        'ERRO AO SAIR:',
        error
      );

      setMensagem(
        'Não foi possível sair da conta.'
      );
    }
  }


  // =====================================================
  // RENDERIZAR LINHA DA LISTA
  // =====================================================

  function renderizarContato({ item }) {
    return (
      <View style={styles.linhaContato}>

        <View style={styles.colunaNome}>
          <Text style={styles.textoNome}>
            {item.nome}
          </Text>
        </View>

        <View style={styles.colunaEmail}>
          <Text style={styles.textoLista}>
            {item.email}
          </Text>
        </View>

        <View style={styles.colunaTelefone}>
          <Text style={styles.textoLista}>
            {item.telefone}
          </Text>
        </View>

        <View style={styles.colunaAcoes}>

          <TouchableOpacity
            style={styles.botaoEditarLista}
            onPress={() => editar(item)}
          >
            <Text style={styles.textoBotaoLista}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoExcluirLista}
            onPress={() => excluir(item.id)}
          >
            <Text style={styles.textoBotaoLista}>
              Excluir
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }


  // =====================================================
  // TELA
  // =====================================================

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
      >

        <Text style={styles.titulo}>
          Cadastro de Contatos
        </Text>


        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />


        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />


        <Text style={styles.label}>
          Telefone
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />


        {mensagem !== '' && (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        )}


        {idEditando === null ? (

          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={cadastrar}
          >
            <Text style={styles.textoBotao}>
              Cadastrar
            </Text>
          </TouchableOpacity>

        ) : (

          <>

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarEdicao}
            >
              <Text style={styles.textoBotao}>
                Salvar alterações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={cancelarEdicao}
            >
              <Text style={styles.textoCancelar}>
                Cancelar edição
              </Text>
            </TouchableOpacity>

          </>

        )}


        <Text style={styles.subtitulo}>
          Contatos cadastrados
        </Text>


        {contatos.length === 0 ? (

          <Text style={styles.listaVazia}>
            Nenhum contato cadastrado.
          </Text>

        ) : (

          <>

            <View style={styles.cabecalhoLista}>

              <View style={styles.colunaNome}>
                <Text style={styles.textoCabecalho}>
                  Nome
                </Text>
              </View>

              <View style={styles.colunaEmail}>
                <Text style={styles.textoCabecalho}>
                  E-mail
                </Text>
              </View>

              <View style={styles.colunaTelefone}>
                <Text style={styles.textoCabecalho}>
                  Telefone
                </Text>
              </View>

              <View style={styles.colunaAcoes}>
                <Text style={styles.textoCabecalho}>
                  Ações
                </Text>
              </View>

            </View>

            <FlatList
              data={contatos}
              keyExtractor={(item) => item.id}
              renderItem={renderizarContato}
              scrollEnabled={false}
            />

          </>

        )}


        <TouchableOpacity
          style={styles.botaoSair}
          onPress={sair}
        >
          <Text style={styles.textoBotao}>
            Sair
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F9FC', // Fundo mais moderno e leve
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    width: '100%',
    maxWidth: 500, // Reduzido de 900 para 500 para não ficar esticado
    alignSelf: 'center',
    padding: 25,
    paddingBottom: 50,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3, // Sombra para Android
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1A202C', // Cinza bem escuro
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4A5568',
  },

  input: {
    width: '100%',
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
    marginBottom: 20,
    color: '#2D3748',
  },

  mensagem: {
    fontSize: 14,
    textAlign: 'center',
    color: '#3182CE',
    marginBottom: 15,
    fontWeight: '500',
  },

  botaoCadastrar: {
    width: '100%',
    height: 52,
    backgroundColor: '#3182CE', // Azul mais moderno
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  botaoSalvar: {
    width: '100%',
    height: 52,
    backgroundColor: '#38A169', // Verde para salvar
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  botaoCancelar: {
    width: '100%',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#A0AEC0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  textoCancelar: {
    color: '#4A5568',
    fontSize: 16,
    fontWeight: '700',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 40,
    marginBottom: 20,
    color: '#2D3748',
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 8,
  },

  listaVazia: {
    textAlign: 'center',
    color: '#A0AEC0',
    fontSize: 15,
    marginVertical: 20,
    fontStyle: 'italic',
  },

  cabecalhoLista: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  linhaContato: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },

  colunaNome: {
    flex: 2,
    paddingRight: 10,
  },

  colunaEmail: {
    flex: 2.5,
    paddingRight: 10,
  },

  colunaTelefone: {
    flex: 1.5,
    paddingRight: 10,
  },

  colunaAcoes: {
    flex: 1.8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },

  textoCabecalho: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A5568',
    textTransform: 'uppercase',
  },

  textoNome: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
  },

  textoLista: {
    fontSize: 14,
    color: '#718096',
  },

  botaoEditarLista: {
    backgroundColor: '#EDF2F7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  botaoExcluirLista: {
    backgroundColor: '#FFF5F5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  textoBotaoLista: {
    color: '#4A5568',
    fontSize: 12,
    fontWeight: '700',
  },

  botaoSair: {
    width: '100%',
    height: 52,
    backgroundColor: '#E53E3E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

});