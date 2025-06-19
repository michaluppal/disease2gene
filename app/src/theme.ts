import { createTheme } from '@mui/material/styles';

// Define base colors for easier management
const primaryColor = '#0A84FF'; // Apple Blue
const secondaryColor = '#FF2D55'; // Apple Pink/Red
const textColorPrimary = '#1D1D1F'; // Near Black (Apple's typical text color)
const textColorSecondary = '#6E6E73'; // Medium Gray (Apple's secondary text)
const backgroundColorDefault = '#F5F5F7'; // Light Gray (similar to macOS window backgrounds)
const paperBackgroundColor = 'rgba(255, 255, 255, 0.9)'; // Slightly more opaque for better readability on colored backgrounds
const paperBackgroundColorSolid = '#FFFFFF'; // Solid white for landing page sections
const borderColor = 'rgba(0, 0, 0, 0.1)'; // Softer border color

// Define a basic shadows array or specific shadow strings if needed early
// This is a simplified version of MUI's shadows[1]
const simpleShadow1 = '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryColor,
      light: '#5AB9FF', // Lighter shade for gradients or highlights
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: backgroundColorDefault, // Used for the main app area
      paper: paperBackgroundColor, // Default for Paper components inside the app
    },
    text: {
      primary: textColorPrimary,
      secondary: textColorSecondary,
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: borderColor,
    action: {
        active: primaryColor,
        hover: 'rgba(10, 132, 255, 0.08)', // primaryColor with low opacity
        selected: 'rgba(10, 132, 255, 0.16)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(10, 132, 255, 0.12)',
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: textColorPrimary, lineHeight: 1.15, letterSpacing: '-0.015em' },
    h2: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: textColorPrimary, lineHeight: 1.2, letterSpacing: '-0.01em' },
    h3: { fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: textColorPrimary, lineHeight: 1.25, letterSpacing: '-0.005em' },
    h4: { fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 600, color: textColorPrimary, lineHeight: 1.3 },
    h5: { fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 600, color: textColorPrimary, lineHeight: 1.35 },
    h6: { fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 600, color: textColorPrimary, lineHeight: 1.4 },
    body1: { fontSize: '1rem', color: textColorSecondary, lineHeight: 1.65 },
    body2: { fontSize: '0.875rem', color: textColorSecondary, lineHeight: 1.6 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.9rem',
      letterSpacing: '0.01em',
    },
    caption: { fontSize: '0.75rem', color: textColorSecondary, lineHeight: 1.5},
    overline: { fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em'}
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
            scrollBehavior: 'smooth', // For smooth scrolling with #links
        },
        body: {
          transition: 'background-color 0.3s ease',
          minWidth: '320px', // Prevent layout issues on very small screens
        },
        '#root': { // Ensure root takes full height for pages like MarketingLandingPage
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0, // Default to no elevation, use borders or specific elevation when needed
      },
      styleOverrides: {
        root: {
          backgroundColor: paperBackgroundColorSolid, // Solid white for most paper elements
          // backdropFilter: 'blur(16px) saturate(180%)', // Use sparingly, can be performance intensive
          // WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: `1px solid ${borderColor}`,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.03)', // Softer default shadow
          transition: 'box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out',
        },
        // Example for app-internal papers that might need the translucent effect
        // You can create a custom variant or apply sx prop for this
        // '.MuiPaper-glass': {
        //   backgroundColor: paperBackgroundColor, // translucent
        //   backdropFilter: 'blur(16px) saturate(180%)',
        //   WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        // }
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px', // Slightly larger padding
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother transition
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: primaryColor,
          // background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorLight} 100%)`, // Optional gradient
          color: '#FFFFFF',
          boxShadow: `0 4px 14px 0 ${primaryColor}50`, // Softer shadow for primary button
          '&:hover': {
            background: `linear-gradient(135deg, #0070e0 0%, #3aa0f0 100%)`, // Darken on hover
            boxShadow: `0 6px 16px 0 ${primaryColor}70`,
          },
        },
        outlinedPrimary: {
          borderColor: primaryColor,
          color: primaryColor,
          '&:hover': {
            backgroundColor: 'rgba(10, 132, 255, 0.06)', // Lighter hover background
            borderColor: primaryColor,
          },
        },
        textPrimary: {
            color: primaryColor,
            '&:hover': {
                backgroundColor: 'rgba(10, 132, 255, 0.06)',
            }
        },
        sizeLarge: {
            padding: '12px 28px',
            fontSize: '1rem',
        }
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Default to outlined
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: paperBackgroundColorSolid,
            color: textColorPrimary,
            borderRadius: 8,
            fontSize: '0.9rem',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            // border: `1px solid ${borderColor}`, // Handled by OutlinedInput
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: `${primaryColor}b3`, // More visible hover border
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: primaryColor,
                borderWidth: '1px', // Ensure it's not too thick
                boxShadow: `0 0 0 2px ${primaryColor}33`, // Focus ring
            },
            '&.Mui-disabled': {
                backgroundColor: 'rgba(0,0,0,0.05)',
            }
          },
          '& .MuiInputLabel-root': {
            color: textColorSecondary,
            fontWeight: 400,
            '&.Mui-focused': {
                color: primaryColor,
            }
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor, // Default border color
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          backgroundColor: paperBackgroundColorSolid,
          color: textColorPrimary,
          fontSize: '0.9rem',
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${primaryColor}b3`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: primaryColor,
            borderWidth: '1px',
            boxShadow: `0 0 0 2px ${primaryColor}33`,
          },
          '& .MuiSvgIcon-root': { color: textColorSecondary },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: textColorSecondary,
          '&.Mui-checked': { color: primaryColor },
        },
      },
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                color: textColorSecondary,
                transition: 'color 0.2s ease, background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(10, 132, 255, 0.08)',
                    color: primaryColor,
                }
            }
        }
    },
    MuiAppBar: {
        defaultProps: {
            elevation: 0, // Consistent with Paper default
        },
        styleOverrides: {
            root: {
                // Styles for AppBar (like in MarketingLandingPage) can be specific to the component
                // or defined here if a global AppBar style is desired.
            }
        }
    },
    MuiList: {
        styleOverrides: {
            root: {
                paddingTop: '8px',
                paddingBottom: '8px',
            }
        }
    },
    MuiListItem: {
        styleOverrides: {
            root: {
                borderRadius: 6,
                transition: 'background-color 0.2s ease-out',
                // marginBottom: '4px', // Can be handled by gap in List or specific overrides
                 '&:last-child': {
                    // marginBottom: 0,
                }
            }
        }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 6,
                transition: 'background-color 0.2s ease-out, color 0.2s ease-out',
                 '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                },
                '&.Mui-selected': {
                    backgroundColor: `${primaryColor}1A`, // More subtle selected state
                    color: primaryColor,
                    fontWeight: 500,
                    '&:hover': {
                        backgroundColor: `${primaryColor}2A`,
                    },
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: primaryColor,
                        fontWeight: 500,
                    }
                }
            }
        }
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth: '40px',
                color: textColorSecondary,
            }
        }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderCollapse: 'separate', // Important for border-spacing
          borderSpacing: '0 8px', // Spacing between rows
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          color: textColorPrimary,
          padding: '12px 16px',
          fontSize: '0.9rem',
          backgroundColor: paperBackgroundColorSolid, // Each cell background
          '&:first-of-type': {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
          '&:last-of-type': {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
        },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(0,0,0,0.025)', // Very subtle head background
          color: textColorPrimary,
           '&:first-of-type': {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 0,
          },
          '&:last-of-type': {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 0,
          },
        },
        body: {
            color: textColorSecondary,
        }
      },
    },
    MuiTooltip: {
        defaultProps: {
            arrow: true,
        },
        styleOverrides: {
            tooltip: {
                backgroundColor: 'rgba(29, 29, 31, 0.92)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                borderRadius: 6,
                padding: '8px 12px',
                fontSize: '0.8rem',
                boxShadow: simpleShadow1, // Use the predefined simple shadow
            },
            arrow: {
                color: 'rgba(29, 29, 31, 0.92)',
            }
        }
    },
    MuiAccordion: {
        defaultProps: {
            elevation: 0,
        },
        styleOverrides: {
            root: {
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                backgroundColor: paperBackgroundColorSolid,
                '&:before': {display: 'none'}, // Remove default top border
                '&.Mui-expanded': {
                    // margin: '12px 0 !important' // Ensure consistent margin when expanded
                },
                '&:first-of-type': {
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                },
                '&:last-of-type': {
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }
            }
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: {
                padding: '0 20px',
                minHeight: '56px',
                '&.Mui-expanded': {
                    minHeight: '56px',
                }
            },
            content: {
                margin: '12px 0 !important', // Override default margin
                 '&.Mui-expanded': {
                    // margin: '12px 0 !important',
                }
            }
        }
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: {
                padding: '8px 20px 20px',
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontWeight: 500,
            },
            outlinedPrimary: {
                borderColor: `${primaryColor}80`, // Softer primary outlined chip
                color: primaryColor,
                backgroundColor: `${primaryColor}1A`
            }
        }
    }
  },
});

export default theme;
