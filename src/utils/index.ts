export const getRandomColor = () => {
    const colors = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#3f51b5",
        "#2196f3",
        "#4caf50",
        "#ff9800",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
