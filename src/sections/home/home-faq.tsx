import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const FAQ_CONTENT = [
  {
    heading: 'Comment ça marche ?',
    detail: (
      <>
        Le fonctionnement est très simple. Cliquez sur{' '}
        <Link href="https://msscorrection.fr/service/">&quot;Commander&quot;</Link> et laissez-vous
        guider par les étapes à suivre ! Une fois que ce sera fait, je m&apos;occupe de tout.
      </>
    ),
  },
  {
    heading: 'Comment voir les corrections apportées sur mon document ?',
    detail: (
      <>
        Sur les logiciels de traitement de texte comme Word ou LibreOffice, il existe le{' '}
        <Link
          target="_blank"
          href="https://support.microsoft.com/fr-fr/office/vid%C3%A9o-suivre-les-modifications-et-afficher-les-marques-3faf8a07-26ed-4b76-b6a0-43cca013e6d3"
        >
          suivi des modifications
        </Link>
        , qui vous permettra de voir toutes les corrections en couleur. Vous aurez la possibilité de
        les valider une par une ou toutes en un seul clic ! Concernant les documents en ligne comme
        Google Doc, il existe le mode &quot;Suggestion&quot;.
      </>
    ),
  },
  {
    heading: 'Quel est le tarif pour la correction de mon texte ?',
    detail: (
      <>
        Pas de panique ! Nous avons créé spécialement pour vous un simulateur en ligne, dans lequel
        vous pourrez ajouter votre fichier. Un calcul sera fait automatiquement par mon logiciel. Il
        est également possible de sélectionner manuellement le nombre de mots de votre document.{' '}
        <br />
        Le tarif peut varier en fonction des options que vous souhaitez (délai, correction classique
        ou embellissement…). Le prix s&apos;affichera instantanément.
        <br />
        <Link href="https://msscorrection.fr/tarifs/">Rendez-vous sur la page du simulateur</Link>
        ou directement sur la{' '}
        <Link href="https://msscorrection.fr/service/">page de calcul de mots automatique</Link>.
      </>
    ),
  },
  {
    heading: 'Comment savoir où en est ma commande ?',
    detail: (
      <>
        Dès que vous passez commande, vous avez accès à une timeline (historique de son avancement)
        en temps réel de la correction. Vous pouvez savoir à tout moment, où en est votre commande.
        <br />
        Vous recevrez également une notification par e-mail dès que votre document corrigé sera prêt
        à être téléchargé. N&apos;hésitez surtout pas à me contacter via le chat de la commande si
        vous avez des questions.
      </>
    ),
  },
  {
    heading: 'Puis-je demander des révisions supplémentaires si quelque chose ne me convient pas ?',
    detail: (
      <>
        Absolument ! Si vous n&apos;êtes pas satisfait(e) des corrections, je vous encourage
        vivement à me notifier. Nous pourrons alors examiner cela ensemble et trouver la meilleure
        solution.
      </>
    ),
  },
  {
    heading:
      "Est-il possible d'avoir des exemples de corrections classiques et de corrections avec embellissement ?",
    detail: (
      <>
        Bien sûr, j&apos;ai mis à disposition des modèles un peu partout sur mon site, pour
        plusieurs types de textes (roman, mémoire, article…) afin que vous puissiez vous faire une
        idée de mon travail.
      </>
    ),
  },
  {
    heading: 'Comment puis-je vous contacter en cas de question ou de problème ?',
    detail: (
      <>
        Vous pouvez me contacter à tout moment grâce au chat en ligne sur le site, en bas à droite.
        <br />
        Nous avons également un chat ouvert pour chaque commande. Je réponds généralement dans
        l&apos;heure. <br />
        Cependant, si vous le souhaitez, vous pouvez également me contacter par mail :
        mss.correction@gmail.com Je répondrai à toutes vos demandes dans des délais records !
      </>
    ),
  },
  {
    heading: "Comment m'assurer de la confidentialité de mon document ?",
    detail: (
      <>
        Je m&apos;engage à respecter la confidentialité de votre fichier. Néanmoins, si vous
        souhaitez vous sécuriser davantage, je peux remplir un accord de confidentialité, sur votre
        demande.
      </>
    ),
  },
];

// ----------------------------------------------------------------------

export default function HomeFaqs() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
      }}
    >
      <m.div variants={varFade().in}>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 5,
              md: 10,
            },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">Questions fréquentes</Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography sx={{ color: 'text.secondary', pb: 12, pt: 4 }}>
              Ce service offre la tranquillité d&apos;esprit, sachant que les aspects linguistiques
              de votre œuvre sont entre des mains expertes.
            </Typography>
          </m.div>
          <div>
            {FAQ_CONTENT.map((accordion, i) => (
              <Accordion key={i}>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                  <Typography variant="subtitle1">{accordion.heading}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ textAlign: 'start' }}>
                  <Typography>{accordion.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Box>
      </m.div>
    </Container>
  );
}
