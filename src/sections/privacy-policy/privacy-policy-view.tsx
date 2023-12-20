/* eslint-disable */
'use client';

import Stack from '@mui/material/Stack';
import Container from '@mui/system/Container/Container';
import Header from 'src/layouts/main/header';

// ----------------------------------------------------------------------

export default function PrivacyPolicyView() {
  return (
    <>
      <Header />
      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            minHeight: '100vh',
          }}
        >
          <div className="">
            <h1 className="text-2xl font-black">Politique de confidentialité</h1>
            <p className="mt-6">
              Cette politique de confidentialité décrit les politiques de Mss Correction, 2 Rue
              Abélard, Nord 59000, France, email : oceane.musso15@gmail.com, téléphone : 0617803480
              sur la collecte, l'utilisation et la divulgation de vos informations que nous
              recueillons lorsque vous utilisez notre site web ( https://msscorrection.fr ). (le
              "Service"). En accédant ou en utilisant le Service, vous consentez à la collecte, à
              l'utilisation et à la divulgation de vos informations conformément à la présente
              politique de confidentialité. Si vous n'y consentez pas, veuillez ne pas accéder au
              service ni l'utiliser.
            </p>
            <p className="mt-6">
              Nous pouvons modifier la présente politique de confidentialité à tout moment sans vous
              en informer au préalable et nous publierons la version révisée de la politique de
              confidentialité sur le service. La politique révisée entrera en vigueur 180 jours
              après sa publication sur le service. Nous vous recommandons donc de consulter
              régulièrement cette page.
            </p>
            <ol className="privacy-policy-ol">
              <li>
                <h2 className="text-xl mt-6 text font-black">
                  Les informations que nous recueillons :
                </h2>

                <p className="mt-6">
                  Nous collecterons et traiterons les informations personnelles suivantes vous
                  concernant :
                </p>
                <ol className="privacy-policy-ol">
                  <li>Nom</li>

                  <li>Email</li>
                </ol>
              </li>

              <li>
                <h2 className="text-xl mt-6 text font-black">
                  Comment nous recueillons vos informations :
                </h2>
                <p className="mt-6">
                  Nous collectons/recevons des informations vous concernant de la manière suivante :
                </p>
                <ol className="privacy-policy-ol">
                  <li>
                    Lorsqu'un utilisateur remplit le formulaire d'inscription ou soumet d'autres
                    informations personnelles
                  </li>
                  <li>Interagit avec le site web</li>
                  <li>A partir de sources publiques</li>
                </ol>
              </li>

              <li>
                <h2 className="text-xl mt-6 text font-black">
                  Comment nous utilisons vos informations :
                </h2>
                <p className="mt-6">
                  Nous utiliserons les informations que nous recueillons vous concernant aux fins
                  suivantes :
                </p>
                <ol className="privacy-policy-ol">
                  <li>Gérer les commandes des clients</li>
                  <li>Gérer les comptes des utilisateurs</li>
                </ol>
                <p className="mt-6">
                  Si nous souhaitons utiliser vos informations à d'autres fins, nous vous
                  demanderons votre consentement et n'utiliserons vos informations qu'après avoir
                  reçu votre consentement et seulement dans le(s) but(s) pour le(s)quel(s) vous avez
                  donné votre consentement, sauf si nous sommes tenus de faire autrement par la loi.
                </p>
              </li>

              <li>
                <h2 className="text-xl mt-6 text font-black">
                  Comment nous partageons vos informations :
                </h2>

                <p className="mt-6">
                  Nous ne transférerons pas vos informations personnelles à des tiers sans
                  solliciter votre consentement, sauf dans les circonstances limitées décrites
                  ci-dessous :
                </p>
                <ol className="privacy-policy-ol">
                  <li>Analyses</li>
                </ol>

                <p className="mt-6">
                  Nous demandons à ces tiers d'utiliser les informations personnelles que nous leur
                  transférons uniquement dans le but pour lequel elles ont été transférées et de ne
                  pas les conserver plus longtemps que nécessaire pour atteindre ledit objectif.
                </p>
                <p className="mt-6">
                  Nous pouvons également divulguer vos informations personnelles dans les cas
                  suivants : (1) pour se conformer aux lois, réglementations, ordonnances
                  judiciaires ou autres processus légaux ; (2) pour faire respecter vos accords avec
                  nous, y compris cette politique de confidentialité ; ou (3) pour répondre à des
                  réclamations selon lesquelles votre utilisation du Service viole les droits d'un
                  tiers. Si le Service ou notre entreprise est fusionné ou acquis par une autre
                  entreprise, vos informations feront partie des actifs transférés au nouveau
                  propriétaire.
                </p>
              </li>

              <li>
                <h2 className="text-xl mt-6 text font-black">Conservation de vos informations :</h2>
                <p className="mt-6">
                  Nous conserverons vos informations personnelles pendant 90 jours à 2 ans après que
                  les utilisateurs aient résilié leurs comptes ou aussi longtemps que nous en avons
                  besoin pour atteindre les objectifs pour lesquels elles ont été collectées, comme
                  cela est détaillé dans cette politique de confidentialité. Nous devons peut-être
                  conserver certaines informations plus longtemps, par exemple, pour la tenue des
                  registres / rapports conformément à la loi applicable ou pour d'autres raisons
                  légitimes telles que l'application de droits légaux, la prévention de la fraude,
                  etc. Les informations anonymes résiduelles et les informations agrégées, qui ne
                  vous identifient pas (directement ou indirectement), peuvent être stockées
                  indéfiniment.
                </p>
              </li>

              <li>
                <h2 className="text-xl mt-6 text font-black">Vos droits :</h2>
                <p className="mt-6">
                  Selon la loi applicable, vous avez peut-être le droit d'accéder à vos données
                  personnelles, de les rectifier ou de les effacer, de recevoir une copie de vos
                  données personnelles, de restreindre ou de vous opposer au traitement actif de vos
                  données, de nous demander de partager (porter) vos informations personnelles avec
                  une autre entité, de retirer tout consentement que vous nous avez donné pour
                  traiter vos données, un droit de déposer une plainte auprès d'une autorité légale
                  et d'autres droits pertinents en vertu des lois applicables. Pour exercer ces
                  droits, vous pouvez nous écrire à oceane.musso15@gmail.com. Nous répondrons à
                  votre demande conformément à la loi applicable.
                </p>

                <p className="mt-6">
                  Notez que si vous ne nous autorisez pas à collecter ou traiter les informations
                  personnelles requises ou si vous retirez votre consentement pour le traitement de
                  ces informations aux fins requises, vous pourriez ne pas être en mesure d'accéder
                  ou d'utiliser les services pour lesquels vos informations ont été demandées.
                </p>
              </li>
              <li>
                <h2 className="text-xl mt-6 text font-black">Cookies, etc.</h2>
                <p className="mt-6">
                  Pour en savoir plus sur l'utilisation de ces technologies de suivi et sur vos
                  choix en ce qui concerne ces technologies, veuillez consulter notre
                  <a href="https://msscorrection.fr">Politique de cookies</a>.
                </p>
              </li>

              <li>
                <h2 className="text-xl mt-6 text font-black">Sécurité :</h2>
                <p className="mt-6">
                  La sécurité de vos informations est importante pour nous et nous utiliserons des
                  mesures de sécurité raisonnables pour empêcher la perte, l'utilisation abusive ou
                  l'altération non autorisée de vos informations sous notre contrôle. Cependant,
                  étant donné les risques inhérents, nous ne pouvons garantir une sécurité absolue
                  et par conséquent, nous ne pouvons assurer ni garantir la sécurité des
                  informations que vous nous transmettez, et vous le faites à vos propres risques.
                </p>
              </li>

              <li>
                <h2 className="text-xl mt-6 text font-black">
                  Réclamations / Délégué à la protection des données :
                </h2>
                <p className="mt-6">
                  Si vous avez des questions ou des préoccupations concernant le traitement de vos
                  informations disponibles chez nous, vous pouvez envoyer un email à notre délégué à
                  la protection des données à Mss Correction, 2 Rue Abélard, email :
                  oceane.musso15@gmail.com. Nous traiterons vos préoccupations conformément à la loi
                  applicable.
                </p>
              </li>
            </ol>
          </div>
        </Stack>
      </Container>
    </>
  );
}
