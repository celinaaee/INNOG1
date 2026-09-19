import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import styles from "../styles/styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>
        HEJ, JEG HEDDER
      </Text>

      <Text style={styles.title}>
        Celina Elken
      </Text>

      <Text style={styles.subtitle}>
        HA(it.) studerende
      </Text>

      <Text style={styles.description}>
        Velkommen til mit interaktive CV.
        Her kan du lære mere om min erfaring,
        mine kompetencer og min profil.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Experience")}
      >
        <Text style={styles.buttonText}>
          Se mit CV
        </Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Contact")}
      >
        <Text style={styles.secondaryButtonText}>
          Kontakt mig
        </Text>
      </Pressable>
    </View>
  );
}