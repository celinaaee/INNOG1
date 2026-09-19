import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";

import styles from "../styles/styles";

const experienceData = [
  {
    id: "1",
    title: "HA(it.)",
    place: "Copenhagen Business School",
    period: "2024 - 2027",
    description:
      "Uddannelse med fokus på IT, forretning, digitalisering og innovation.",
  },
  {
    id: "2",
    title: "Arbejdserfaring",
    place: "Group Online",
    period: "2023 - nu",
    description:
      "Udover studiet er jeg ansat som Junior IT Specialist, hvor jeg får lov til at bruge mine færdigheder i praksis.",
  },
  {
    id: "3",
    title: "React Native projekt",
    place: "CBS",
    period: "2026",
    description:
      "Udvikling af en mobil CV-app i React Native som en del af INNT.",
  },
];

export default function ExperienceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Min erfaring</Text>

      <Text style={styles.intro}>
        Her kan du se et udvalg af min uddannelse,
        erfaring og projekter.
      </Text>

      <FlatList
        data={experienceData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text style={styles.place}>
              {item.place}
            </Text>

            <Text style={styles.period}>
              {item.period}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Contact")}
      >
        <Text style={styles.buttonText}>
          Kontakt mig
        </Text>
      </Pressable>
    </View>
  );
}