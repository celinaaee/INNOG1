import { useEffect, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/styles";

// Brugeroprettede projekter gemmes på telefonen og indlæses ved opstart.
// Denne MVP bruger lokal lagring; der er ingen deling på tværs af enheder.
const STORAGE_KEY = "@mycv:projects:v1";

// Ét udgangspunkt fra godkendelsesopgave 1. Brugeren kan selv fjerne det.
const starterProjects = [
  {
    id: "starter-mycv",
    title: "MyCV – interaktivt CV",
    technologies: "React Native, Expo",
    description: "En mobil portfolio med erfaring og kontaktoplysninger.",
  },
];

export default function ProjectsScreen() {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        // Gemte tomme lister er også gyldige: så kommer slettede projekter ikke tilbage.
        const parsed = saved === null ? starterProjects : JSON.parse(saved);
        if (isMounted) {
          setProjects(Array.isArray(parsed) ? parsed : starterProjects);
        }
      } catch (error) {
        if (isMounted) {
          Alert.alert("Kunne ikke indlæse projekter", "Viser eksempelprojektet.");
          setProjects(starterProjects);
        }
      } finally {
        if (isMounted) setLoaded(true);
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  async function storeProjects(nextProjects) {
    // Opdater først UI. Ved fejl får brugeren tydelig besked.
    setProjects(nextProjects);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextProjects));
    } catch (error) {
      Alert.alert(
        "Kunne ikke gemme",
        "Ændringen vises nu, men kan være væk næste gang du åbner appen."
      );
    }
  }

  function addProject() {
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanDescription) {
      Alert.alert("Udfyld felterne", "Skriv mindst en projekttitel og en beskrivelse.");
      return;
    }

    const newProject = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: cleanTitle,
      technologies: technologies.trim(),
      description: cleanDescription,
    };
    storeProjects([newProject, ...projects]);
    setTitle("");
    setTechnologies("");
    setDescription("");
  }

  function deleteProject(id) {
    Alert.alert(
      "Slet projekt?",
      "Projektet bliver fjernet fra denne telefon.",
      [
        { text: "Annuller", style: "cancel" },
        {
          text: "Slet",
          style: "destructive",
          onPress: () => storeProjects(projects.filter((item) => item.id !== id)),
        },
      ]
    );
  }

  const normalizedSearch = search.trim().toLocaleLowerCase("da-DK");
  const matchingProjects = projects.filter((item) =>
    [item.title, item.technologies, item.description]
      .join(" ")
      .toLocaleLowerCase("da-DK")
      .includes(normalizedSearch)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={matchingProjects}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.projectsListContent}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Mine projekter</Text>
            <Text style={styles.intro}>
              Udforsk projekter og søg på navn, teknologier eller beskrivelse.
            </Text>

            <Text style={styles.inputLabel}>Søg i projekter</Text>
            <TextInput
              style={styles.input}
              placeholder="Fx React Native"
              value={search}
              onChangeText={setSearch}
              accessibilityLabel="Søg i projekter"
              autoCapitalize="none"
            />

            <Text style={styles.sectionTitle}>Tilføj et projekt</Text>
            <Text style={styles.helperText}>
              Projekter gemmes på denne telefon, også når appen lukkes.
            </Text>

            <Text style={styles.inputLabel}>Titel</Text>
            <TextInput
              style={styles.input}
              placeholder="Fx Studieprojekt"
              value={title}
              onChangeText={setTitle}
              accessibilityLabel="Projekttitel"
            />

            <Text style={styles.inputLabel}>Teknologier</Text>
            <TextInput
              style={styles.input}
              placeholder="Fx React Native, Firebase"
              value={technologies}
              onChangeText={setTechnologies}
              accessibilityLabel="Teknologier anvendt i projektet"
            />

            <Text style={styles.inputLabel}>Beskrivelse</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Hvad gik projektet ud på?"
              multiline
              value={description}
              onChangeText={setDescription}
              accessibilityLabel="Projektbeskrivelse"
              textAlignVertical="top"
            />

            <Pressable
              style={styles.button}
              onPress={addProject}
              accessibilityRole="button"
              accessibilityLabel="Tilføj projekt"
            >
              <Text style={styles.buttonText}>Gem projekt</Text>
            </Pressable>

            <Text style={styles.sectionTitle}>
              Gemte projekter ({matchingProjects.length})
            </Text>
            {!loaded && <ActivityIndicator accessibilityLabel="Indlæser projekter" />}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {!!item.technologies && (
              <Text style={styles.projectTechnology}>{item.technologies}</Text>
            )}
            <Text style={styles.description}>{item.description}</Text>
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteProject(item.id)}
              accessibilityRole="button"
              accessibilityLabel={`Slet projekt ${item.title}`}
            >
              <Text style={styles.deleteButtonText}>Slet projekt</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          loaded ? (
            <Text style={styles.emptyText}>
              Ingen projekter matcher søgningen. Prøv en anden søgning eller
              tilføj et projekt.
            </Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}