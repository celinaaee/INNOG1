import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F7F7F7",
  },

  centerContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
  },

  smallText: {
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 8,
    color: "#666",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  bigTitle: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 20,
    color: "#555",
    marginBottom: 25,
  },

  intro: {
    fontSize: 16,
    lineHeight: 23,
    color: "#555",
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },

  place: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },

  period: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#111",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },

  secondaryButtonText: {
    color: "#111",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;