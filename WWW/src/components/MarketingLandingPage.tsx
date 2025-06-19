import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Link as MuiLink,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // For internal navigation
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ScienceIcon from '@mui/icons-material/Science'; // Icon for ResearchShop
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import MenuIcon from '@mui/icons-material/Menu'; // For mobile nav
import Drawer from '@mui/material/Drawer';


// Helper component for section titles
const SectionTitle: React.FC<{ title: string; subtitle?: string; id?: string }> = ({ title, subtitle, id }) => (
  <Box sx={{ textAlign: 'center', mb: {xs: 4, md: 8} }} id={id}>
    <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', fontSize: {xs: '2.2rem', md: '3rem'} }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', margin: '0 auto', fontSize: {xs: '1rem', md: '1.25rem'} }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

// Placeholder data (replace with your actual content)
const services = [
  {
    icon: <BarChartIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />,
    title: 'Advanced Query Building',
    description: 'Visually construct complex research queries with ease, targeting specific fields and keywords for precise results.',
  },
  {
    icon: <ScienceIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />,
    title: 'Seamless PubMed Integration',
    description: 'Directly search and fetch results from PubMed, streamlining your literature review process without leaving the platform.',
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />,
    title: 'Customizable Output Tables',
    description: 'Define your own data columns and preview results in a structured, easy-to-understand table tailored to your needs.',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />,
    title: 'Efficient Data Management',
    description: 'Save, organize, and manage your research queries and results effectively. (Future: team collaboration).',
  },
];

const processSteps = [
  { number: '01', title: 'Define Your Scope', description: 'Clearly outline your research questions and identify key terms for your query.' },
  { number: '02', title: 'Build Your Query', description: 'Use our intuitive wizard to construct precise search strings with boolean operators and field tags.' },
  { number: '03', title: 'Fetch & Preview Data', description: 'Run your query against PubMed and get instant results, previewed in a customizable table.' },
  { number: '04', title: 'Analyze & Export', description: 'Review your findings, refine your search if needed, and export data for reports or further analysis.' },
];

const testimonials = [
  {
    name: 'Dr. Alisha Chen',
    role: 'Postdoctoral Researcher, NeuroAI Institute',
    avatar: 'https://source.unsplash.com/random/100x100/?scientist,woman', // Placeholder
    quote:
      'ResearchShop has cut down my literature review time by at least 50%. The query builder is a game-changer for complex searches!',
  },
  {
    name: 'Marcus Bellwether',
    role: 'Medical Librarian, City General Hospital',
    avatar: 'https://source.unsplash.com/random/100x100/?librarian,man', // Placeholder
    quote:
      'I recommend ResearchShop to all our staff and students. It simplifies PubMed searching and helps find relevant papers much faster.',
  },
   {
    name: 'Dr. Kenji Tanaka',
    role: 'Biotech Startup Founder',
    avatar: 'https://source.unsplash.com/random/100x100/?ceo,asian', // Placeholder
    quote:
      'For staying on top of the latest research in a fast-moving field, ResearchShop is an indispensable tool. Intuitive and powerful.',
  },
];

const faqItems = [
  {
    question: 'Is ResearchShop suitable for all types of academic research?',
    answer: 'ResearchShop is particularly powerful for biomedical and life sciences research due to its PubMed integration. However, its query-building principles can be applied more broadly.',
  },
  {
    question: 'What are the subscription options?',
    answer: 'We offer a free basic tier for individual use. Our premium plans include advanced features, more saved queries, and (soon) team collaboration tools. Check our Pricing section for details.',
  },
  {
    question: 'How does ResearchShop ensure data accuracy?',
    answer: 'ResearchShop directly interfaces with the PubMed database, ensuring that the data you retrieve is as up-to-date and accurate as the source itself.',
  },
  {
    question: 'Can I save and share my queries?',
    answer: 'Yes, saving queries is a core feature. Sharing capabilities are planned for our upcoming team collaboration updates.',
  },
];

const companyStats = [
    { value: '10k+', label: 'Queries Run Monthly' },
    { value: '98%', label: 'User Satisfaction' },
    { value: '500+', label: 'Institutions Using' },
    { value: '24/7', label: 'Support Availability' },
];


const MarketingLandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const navLinks = [
    { title: 'Features', href: '#features' },
    { title: 'How it Works', href: '#process' },
    { title: 'Testimonials', href: '#testimonials' },
    // { title: 'Pricing', href: '#pricing' }, // Example
    { title: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if(isMobile) setMobileOpen(false); // Close drawer on mobile after navigation
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
        ResearchShop
      </Typography>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.title} disablePadding>
            <Button
              fullWidth
              onClick={() => handleScrollTo(link.href.substring(1))}
              sx={{ justifyContent: 'center', color: 'text.primary', my: 1 }}
            >
              {link.title}
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{mt:2}}>
             <Button component={RouterLink} to="/login" variant="outlined" color="primary" fullWidth sx={{my:1}}>
                Login
              </Button>
        </ListItem>
        <ListItem disablePadding>
             <Button component={RouterLink} to="/app" variant="contained" color="primary" fullWidth sx={{my:1}}>
                Get Started Free
              </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fff' /* Base white background */ }}>
      {/* Animated Background - subtle and behind everything */}
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          height: '100vh',
          zIndex: -2,
          background: 'linear-gradient(45deg, #e0f2ff, #f8f9fa, #e0f7fa, #f3e5f5)', // Very light, airy gradient
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 30s ease infinite',
          '@keyframes gradientAnimation': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      />
      {/* Optional subtle pattern overlay */}
      {/* <Box sx={{ position: 'fixed', width: '100%', height: '100vh', zIndex: -1, backgroundImage: 'url("/path/to/subtle-pattern.png")', opacity: 0.05 }} /> */}


      {/* Nav Bar */}
      <AppBar
        position="sticky"
        elevation={0} // Initial elevation is 0
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly more opaque white
          backdropFilter: 'blur(10px) saturate(150%)',
          WebkitBackdropFilter: 'blur(10px) saturate(150%)',
          borderBottom: '1px solid',
          borderColor: 'divider', // Use theme's divider
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          // boxShadow will be applied by MUI based on scroll elevation or can be manually set
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
            <MuiLink component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <ScienceIcon sx={{ color: 'primary.main', mr: 1, fontSize: '2.2rem' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                ResearchShop
              </Typography>
            </MuiLink>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.title}
                  onClick={() => handleScrollTo(link.href.substring(1))}
                  sx={{ color: 'text.secondary', fontWeight: 500, px: 1.5, '&:hover': { color: 'primary.main', backgroundColor: 'action.hover' } }}
                >
                  {link.title}
                </Button>
              ))}
              <Button component={RouterLink} to="/login" variant="text" color="primary" sx={{ ml: 2, fontWeight: 500 }}>
                Login
              </Button>
              <Button component={RouterLink} to="/app" variant="contained" color="primary" sx={{ fontWeight: 500, boxShadow: 'none', '&:hover': {boxShadow: theme.shadows[1]} }}>
                Get Started Free
              </Button>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, backgroundColor: 'background.paper' },
        }}
      >
        {drawer}
      </Drawer>


      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, overflowX: 'hidden' /* Prevent horizontal scroll */ }}>
        {/* Hero Section */}
        <Box
          id="hero"
          sx={{
            pt: { xs: 8, md: 12 },
            pb: { xs: 10, md: 16 },
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // minHeight: { xs: 'calc(80vh - 64px)', md: 'calc(90vh - 64px)' },
            px: 2,
          }}
        >
          <Container maxWidth="md">
            <Chip label="Streamline Your Research" color="primary" variant="outlined" sx={{ mb: 3, fontSize: '0.9rem', py: 0.5, px: 1, borderColor: 'primary.light' }} />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                mb: 3,
                fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              Unlock Research Insights, Faster Than Ever.
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 5, maxWidth: '750px', margin: '0 auto 40px auto', fontSize: {xs: '1.1rem', md: '1.3rem'} }}>
              ResearchShop empowers you with an intuitive query wizard and seamless PubMed integration to accelerate your literature review and discovery process.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
              <Button component={RouterLink} to="/app" variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} sx={{ py: 1.5, px: 4, fontSize: '1.1rem', boxShadow: theme.shadows[2], '&:hover': {transform: 'translateY(-2px)', boxShadow: theme.shadows[4]} }}>
                Start Your Free Trial
              </Button>
              <Button variant="outlined" color="primary" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }} onClick={() => handleScrollTo('features')}>
                Learn More
              </Button>
            </Box>
             <Box sx={{mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, color: 'text.secondary'}}>
                <StarIcon fontSize="small" sx={{color: '#FFC107'}}/>
                <StarIcon fontSize="small" sx={{color: '#FFC107'}}/>
                <StarIcon fontSize="small" sx={{color: '#FFC107'}}/>
                <StarIcon fontSize="small" sx={{color: '#FFC107'}}/>
                <StarIcon fontSize="small" sx={{color: '#FFD54F'}}/>
                <Typography variant="body2" sx={{ml: 1}}>Trusted by researchers worldwide</Typography>
            </Box>
            {/* Optional: Placeholder for a product image/video */}
            {/* <Box sx={{ mt: {xs: 6, md: 10}, width: '100%', maxWidth: '700px', height: 'auto', backgroundColor: 'grey.200', borderRadius: 2, aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">Product Screenshot/Video Placeholder</Typography>
            </Box> */}
          </Container>
        </Box>

        {/* Services/Features Section */}
        <Box id="features" sx={{ py: {xs: 8, md: 12}, backgroundColor: 'rgba(240, 248, 255, 0.5)' /* Alice Blue light */, borderTop: '1px solid', borderColor: 'divider' }}>
          <Container maxWidth="lg">
            <SectionTitle title="Why Choose ResearchShop?" subtitle="Discover the powerful features designed to make your research more efficient and effective." />
            <Grid container spacing={4}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={3} key={service.title}>
                  <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': {transform: 'translateY(-5px)', boxShadow: theme.shadows[3]} }}>
                    {service.icon}
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mt:1 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Process Section */}
        <Box id="process" sx={{ py: {xs: 8, md: 12} }}>
          <Container maxWidth="md">
            <SectionTitle title="Simple Steps to Powerful Insights" subtitle="Our streamlined process helps you go from question to discovery in minutes." />
            <Grid container spacing={isMobile ? 3 : 0} alignItems="stretch">
              {processSteps.map((step, index) => (
                <React.Fragment key={step.title}>
                  <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <Typography variant="h2" component="div" sx={{ fontWeight: 700, color: 'primary.main', mr: 1.5, lineHeight: 1 }}>
                        {step.number}
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {step.title}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                      {step.description}
                    </Typography>
                  </Grid>
                  {index < processSteps.length - 1 && !isMobile && (
                     <Grid item md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', my: 'auto' }}>
                        <Box sx={{ width: '60%', height: '2px', backgroundColor: 'divider', position: 'absolute' }} />
                        <ArrowForwardIcon sx={{ color: 'text.disabled', fontSize: '1.5rem', zIndex: 1, backgroundColor: 'background.default', p: 0.2, borderRadius: '50%' }} />
                    </Grid>
                  )}
                   {index < processSteps.length - 1 && isMobile && (
                     <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                        <Box sx={{ height: '30px', width: '2px', backgroundColor: 'divider' }} />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* About Company / Stats Section */}
        <Box id="about" sx={{ py: {xs: 8, md: 12}, backgroundColor: 'rgba(240, 248, 255, 0.5)', borderTop: '1px solid', borderColor: 'divider' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="overline" color="primary.main" sx={{fontWeight: 600, display: 'block', mb:1}}>Our Mission</Typography>
                        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
                            Empowering Researchers Worldwide
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            At ResearchShop, we believe that groundbreaking discoveries shouldn't be hindered by cumbersome tools. Our mission is to provide researchers with intuitive, powerful, and accessible software that streamlines the literature review process, allowing more time for critical thinking and innovation.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            We are a passionate team of developers, researchers, and data scientists dedicated to building the next generation of research tools.
                        </Typography>
                        <Button variant="outlined" color="primary" component={RouterLink} to="/about-us"> {/* Create an About Us page */}
                            Learn More About Our Team
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            {companyStats.map(stat => (
                                <Grid item xs={6} key={stat.label}>
                                    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
                                        <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main', fontSize: {xs: '2rem', md: '2.5rem'} }}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>


        {/* Testimonial Section */}
        <Box id="testimonials" sx={{ py: {xs: 8, md: 12} }}>
          <Container maxWidth="lg">
            <SectionTitle title="Loved by Researchers Like You" subtitle="Don't just take our word for it. See what leading scientists and academics are saying about ResearchShop." />
            <Grid container spacing={4}>
              {testimonials.map((testimonial) => (
                <Grid item xs={12} md={4} key={testimonial.name}>
                  <Paper elevation={0} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
                    <FormatQuoteIcon sx={{ fontSize: 40, color: 'primary.light', mb: 2, transform: 'rotate(180deg)' }} />
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', flexGrow: 1, mb: 2 }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 56, height: 56, mr: 2, border: '2px solid', borderColor: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Why Choose Us Section (can be integrated or a distinct section) */}
        {/* For this example, key benefits are in the "Features" section. This could be a more detailed comparison or unique selling propositions. */}


        {/* FAQ Section */}
        <Box id="faq" sx={{ py: {xs: 8, md: 12}, backgroundColor: 'rgba(240, 248, 255, 0.5)', borderTop: '1px solid', borderColor: 'divider' }}>
          <Container maxWidth="md">
            <SectionTitle title="Frequently Asked Questions" subtitle="Have questions? We've got answers. If you don't find what you're looking for, feel free to contact us." />
            {faqItems.map((item, index) => (
              <Accordion key={index} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, backgroundColor: 'background.paper', mb: 1.5, '&:before': {display: 'none'}, '&.Mui-expanded': { margin: '12px 0'} }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon color="primary"/>} aria-controls={`faq-panel${index}-content`} id={`faq-panel${index}-header`}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.primary' }}>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Box>

        {/* CTA Section */}
        <Box id="cta" sx={{ py: {xs: 10, md: 15}, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, color: 'text.primary', mb: 3, fontSize: {xs: '2.2rem', md: '2.8rem'} }}>
              Ready to Supercharge Your Research?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 5, maxWidth: '600px', margin: '0 auto 40px auto' }}>
              Join thousands of researchers who are saving time and uncovering insights with ResearchShop. Get started today with our free trial.
            </Typography>
            <Button component={RouterLink} to="/app" variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} sx={{ py: 1.5, px: 5, fontSize: '1.1rem', boxShadow: theme.shadows[2], '&:hover': {transform: 'translateY(-2px)', boxShadow: theme.shadows[4]} }}>
              Start Free Trial Now
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>No credit card required. Cancel anytime.</Typography>
          </Container>
        </Box>

      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, backgroundColor: 'rgba(29, 29, 31, 0.95)', /* Dark footer */ color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                 <ScienceIcon sx={{ color: 'primary.main', mr: 1, fontSize: '2rem' }} />
                 <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>ResearchShop</Typography>
              </Box>
              <Typography variant="body2" sx={{mb:2}}>
                Accelerating scientific discovery through intuitive research tools.
              </Typography>
              <Box>
                <IconButton component="a" href="https://twitter.com" target="_blank" sx={{color: 'rgba(255,255,255,0.7)', '&:hover': {color: '#fff'}}}><TwitterIcon /></IconButton>
                <IconButton component="a" href="https://facebook.com" target="_blank" sx={{color: 'rgba(255,255,255,0.7)', '&:hover': {color: '#fff'}}}><FacebookIcon /></IconButton>
                <IconButton component="a" href="https://linkedin.com" target="_blank" sx={{color: 'rgba(255,255,255,0.7)', '&:hover': {color: '#fff'}}}><LinkedInIcon /></IconButton>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#fff', mb: 1.5 }}>Product</Typography>
              <MuiLink component={RouterLink} to="/#features" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>Features</MuiLink>
              <MuiLink component={RouterLink} to="/pricing" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>Pricing</MuiLink>
              <MuiLink component={RouterLink} to="/changelog" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>Changelog</MuiLink>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#fff', mb: 1.5 }}>Company</Typography>
              <MuiLink component={RouterLink} to="/about-us" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>About Us</MuiLink>
              <MuiLink component={RouterLink} to="/contact" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>Contact</MuiLink>
              <MuiLink component={RouterLink} to="/careers" display="block" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>Careers</MuiLink>
            </Grid>
             <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#fff', mb: 1.5 }}>Stay Updated</Typography>
              <Typography variant="body2" sx={{mb:1.5}}>Get the latest news and updates from ResearchShop.</Typography>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                fullWidth
                InputProps={{
                  endAdornment: <Button variant="contained" color="primary" sx={{ml: -1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, py: '9px'}}>Subscribe</Button>,
                  sx: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', '& .MuiOutlinedInput-notchedOutline': {borderColor: 'rgba(255,255,255,0.2)'}, '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'primary.light'} }
                }}
                sx={{ '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)'} }}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', pt: 4, mt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="body2">&copy; {new Date().getFullYear()} ResearchShop. All rights reserved.</Typography>
            <MuiLink component={RouterLink} to="/privacy-policy" color="inherit" sx={{mx:1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>Privacy Policy</MuiLink>
            |
            <MuiLink component={RouterLink} to="/terms-of-service" color="inherit" sx={{mx:1, textDecoration: 'none', '&:hover': {color: 'primary.light'} }}>Terms of Service</MuiLink>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MarketingLandingPage;

