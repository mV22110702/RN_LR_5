import 'react-native-get-random-values';
import {
  Button,
  Modal,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import { AddSectionFormData, AddSectionModal } from './AddSectionModal';
import { SectionHeader } from './SectionHeader';
import { v4 as uuidv4 } from 'uuid';
import { SectionItem } from './SectionItem';
import { CustomButton } from './CustomButton';
import { AddTodoFormData, AddTodoModal } from './AddTodoModal';

type TodoSection = { sectionName: string; data: TodoItem[]; id: string };
type TodoItem = { description: string; dueDate: Date; id: string };
export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [todoSections, setTodoSections] = useState<TodoSection[]>([]);
  const [doShowAddSectionModal, setDoShowAddSectionModal] =
    useState<boolean>(false);
  const [doShowAddTodoModal, setDoShowAddTodoModal] = useState<boolean>(false);

  const handleShowAddSectionModal = useCallback(() => {
    setDoShowAddSectionModal(true);
  }, [setDoShowAddSectionModal]);

  const handleShowAddTodoModal = useCallback(
    (sectionId: string) => {
      setActiveSectionId(sectionId);
      setDoShowAddTodoModal(true);
    },
    [setDoShowAddTodoModal, setActiveSectionId],
  );

  const handleCloseAddSectionModal = useCallback(() => {
    setDoShowAddSectionModal(false);
  }, [setDoShowAddSectionModal]);

  const handleCloseAddTodoModal = useCallback(() => {
    setDoShowAddTodoModal(false);
  }, [setDoShowAddTodoModal]);

  const handleAddSection = useCallback<(formData: AddSectionFormData) => void>(
    ({ name }) => {
      console.log(`NAME: ${name}`);
      setTodoSections((prevState) => [
        ...prevState,
        { sectionName: name, data: [], id: uuidv4() },
      ]);
    },
    [setTodoSections],
  );

  const handleAddTodo = useCallback<
    (sectionId: string) => (formData: AddTodoFormData) => void
  >(
    (sectionId: string) =>
      ({ description, dueDate }) => {
        setTodoSections((prevState) =>
          prevState.map((todoSection) =>
            todoSection.id !== sectionId
              ? todoSection
              : {
                  ...todoSection,
                  data: [
                    ...todoSection.data,
                    { description, dueDate, id: uuidv4() },
                  ],
                },
          ),
        );
      },
    [setTodoSections],
  );

  const handleDeleteSection = useCallback(
    (id: string) => {
      setTodoSections((prevState) =>
        prevState.filter((section) => section.id !== id),
      );
    },
    [setTodoSections],
  );

  const handleDeleteTodo = useCallback(
    (sectionId: string) => (todoId: string) => {
      setTodoSections((prevState) =>
        prevState.map((todoSection) =>
          todoSection.id !== sectionId
            ? todoSection
            : {
                ...todoSection,
                data: todoSection.data.filter((todo) => todo.id !== todoId),
              },
        ),
      );
    },
    [setTodoSections],
  );

  return (
    <SafeAreaView style={styles.container}>
      <AddSectionModal
        handleAddSection={handleAddSection}
        doShowAddSectionModal={doShowAddSectionModal}
        handleCloseAddSectionModal={handleCloseAddSectionModal}
      />
      {activeSectionId && (
        <AddTodoModal
          doShowAddTodoModal={doShowAddTodoModal}
          handleCloseAddTodoModal={handleCloseAddTodoModal}
          handleAddTodo={handleAddTodo(activeSectionId)}
        />
      )}
      <Text style={styles.header}>Todo App</Text>
      <View style={{ marginLeft: 'auto' }}>
        <CustomButton
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
            margin: 5,
            padding: 10,
          }}
          onPress={handleShowAddSectionModal}
        >
          <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
            Add Section
          </Text>
        </CustomButton>
      </View>
      <SectionList
        sections={todoSections}
        renderItem={({ item, section }) => {
          return (
            <SectionItem
              item={item}
              handleDeleteTodo={handleDeleteTodo(section.id)}
            />
          );
        }}
        style={styles.scrollView}
        renderSectionHeader={({ section }) => (
          <SectionHeader
            title={section.sectionName}
            id={section.id}
            handleShowAddTodoModal={handleShowAddTodoModal}
            handleDeleteSection={handleDeleteSection}
          />
        )}
        ListEmptyComponent={<Text>Nothing to do</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 50,
  },
  hr: {
    height: StyleSheet.hairlineWidth,
  },
});

export { type TodoItem };
