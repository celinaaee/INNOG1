import {
  View,
  Text,
  Pressable,
  Linking,
} from "react-native";

import styles from "../styles/styles";

export default function ContactScreen() {

  const sendEmail = () => {
    Linking.openURL("mailto:ceel24ab@student.cbs.dk");
  };

  return (
    <View style={styles.centerContainer}>

      <Text style={styles.title}>
        Kontakt mig
      </Text>

      <Text style={styles.description}>
        Har du lyst til at høre mere om mig?
        Du er velkommen til at kontakte mig.
      </Text>

      <Text style={styles.subtitle}>
        ceel24ab@student.cbs.dk
      </Text>

      <Pressable
        style={styles.button}
        onPress={sendEmail}
      >
        <Text style={styles.buttonText}>
          Send email
        </Text>
      </Pressable>

    </View>
  );
}