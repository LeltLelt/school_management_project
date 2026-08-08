import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Divider,
} from "@mui/material";

function Settings() {

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    // Language change
    const handleLanguageChange = (event) => {

        const newLanguage = event.target.value;

        setLanguage(newLanguage);

        localStorage.setItem(
            "language",
            newLanguage
        );

        window.dispatchEvent(
            new Event("settingsChanged")
        );
    };

    // Dark mode change
    const handleDarkModeChange = (event) => {

        const newDarkMode = event.target.checked;

        setDarkMode(newDarkMode);

        localStorage.setItem(
            "darkMode",
            newDarkMode
        );

        window.dispatchEvent(
            new Event("settingsChanged")
        );
    };

    return (

        <Box sx={{ p: 3 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                {language === "my"
                    ? "ဆက်တင်များ"
                    : "Settings"}
            </Typography>

            <Paper
                sx={{
                    p: 3,
                    maxWidth: 600
                }}
            >

                {/* Language */}

                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    {language === "my"
                        ? "ဘာသာစကား"
                        : "Language"}
                </Typography>

                <FormControl
                    fullWidth
                    sx={{ mb: 3 }}
                >

                    <InputLabel>
                        {language === "my"
                            ? "ဘာသာစကား"
                            : "Language"}
                    </InputLabel>

                    <Select
                        value={language}
                        label={
                            language === "my"
                                ? "ဘာသာစကား"
                                : "Language"
                        }
                        onChange={handleLanguageChange}
                    >

                        <MenuItem value="en">
                            English
                        </MenuItem>

                        <MenuItem value="my">
                            မြန်မာ
                        </MenuItem>

                    </Select>

                </FormControl>

                <Divider sx={{ mb: 3 }} />

                {/* Dark Mode */}

                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    {language === "my"
                        ? "အသွင်အပြင်"
                        : "Appearance"}
                </Typography>

                <FormControlLabel
                    control={
                        <Switch
                            checked={darkMode}
                            onChange={handleDarkModeChange}
                        />
                    }
                    label={
                        language === "my"
                            ? "Dark Mode"
                            : "Dark Mode"
                    }
                />

            </Paper>

        </Box>
    );
}

export default Settings;



