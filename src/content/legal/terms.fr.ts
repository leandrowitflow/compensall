import type { LegalDocument } from "./types";

export const termsFr: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Résumé:" },
      { type: "text", text: " Les présentes Conditions Générales régissent votre relation avec " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". Nous travaillons sur une base No win, no fee: notre assistance juridique ne vous coûte rien, sauf si nous obtenons avec succès votre indemnisation. Si la réclamation doit faire l'objet d'une procédure contentieuse, des honoraires de résultat supplémentaires de 20 % s'appliquent, dus uniquement en cas d'issue favorable. Tous les frais figurent dans la ",
      },
      { type: "link", href: "/prices", label: "Liste des Prix" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Définitions",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Sauf si le contexte des présentes Conditions Générales exige une autre interprétation, les termes commençant par une majuscule utilisés dans les présentes Conditions Générales ("CG") ont la signification indiquée ci-dessous :',
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: '"Contrat" :' },
              { type: "text", text: " l'accord conclu entre le Client et " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", formé par l'acceptation des CG par le Client. Pour la fourniture des Services d'Assistance Juridique, le Contrat est considéré comme valable dès lors que le Client a signé le Formulaire de Cession, en plus d'avoir accepté les présentes CG.",
              },
            ],
            [
              { type: "strong", text: '"Compensall" :' },
              { type: "text", text: " la personne morale (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", immatriculation légale " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), dont le siège est situé " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", adresse électronique " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: '"Réglementation relative aux droits des passagers aériens" :' },
              {
                type: "text",
                text: " toute loi, tout règlement, toute directive ou tout instrument similaire, adopté au niveau étatique, européen, fédéral, national ou régional, établissant des règles d'indemnisation, de dédommagement ou de remboursement des passagers en cas de surréservation, de retard ou d'annulation de vol.",
              },
            ],
            [
              { type: "strong", text: '"Formulaire de Cession" :' },
              { type: "text", text: " l'accord entre le Client et " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " conclu après que le Client a pris connaissance des CG et les a acceptées, signé par voie électronique ou par écrit. En vertu de ce Contrat, le Client nous donne une autorisation exclusive et irrévocable d'engager et de mener à bien une réclamation fondée sur ses droits tels qu'établis par le Règlement (CE) n° 261/2004 du Parlement européen et du Conseil et la jurisprudence associée, ainsi que d'accomplir tous les actes nécessaires, y compris déléguer ou céder la réclamation, recevoir des paiements et traiter, demander ou communiquer des données personnelles si nécessaire, exclusivement auprès des entités liées et uniquement à cette fin.",
              },
            ],
            [
              { type: "strong", text: '"Client(s)" :' },
              {
                type: "text",
                text: " toute personne ayant signé le Formulaire de Cession, accepté les CG et sollicitant une indemnisation pour un vol.",
              },
            ],
            [
              { type: "strong", text: '"Indemnisation" :' },
              {
                type: "text",
                text: " le montant total versé par une compagnie aérienne au titre d'une réclamation, à titre d'indemnisation, de règlement amiable, de geste commercial ou autre, transféré au Client ou à ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " après l'acceptation des CG par le Client." },
            ],
            [
              { type: "strong", text: '"Service d\'Information" :' },
              { type: "text", text: " la fourniture par " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " d'informations relatives aux vols, y compris des informations sur les compagnies aériennes, les aéroports, les droits des passagers aériens, le droit de la consommation et d'autres informations de voyage. Ces informations seront pertinentes pour les voyages du Client et peuvent également inclure un contexte plus large, tel que des classements d'aéroports ou de compagnies aériennes ou des mises à jour sur l'évolution des droits des passagers aériens. Elles sont fournies par communications électroniques, notamment par e-mail, panneaux électroniques personnalisés, sites web contrôlés par ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou applications mobiles." },
            ],
            [
              { type: "strong", text: '"Contentieux" :' },
              {
                type: "text",
                text: " si la compagnie aérienne ne répond pas dans un délai de deux mois, ou si sa réponse est jugée insatisfaisante à l'issue d'une évaluation interne, la réclamation fera l'objet d'une procédure contentieuse. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " se réserve le droit exclusif de déterminer la voie la plus appropriée, sans obligation de justifier ses décisions, le Client étant toutefois tenu informé tout au long de la procédure. Compte tenu du temps et des ressources considérables qu'exige le contentieux, des honoraires de résultat supplémentaires de 20 % s'appliquent, dus uniquement en cas d'issue favorable. La présence du Client au tribunal ne sera pas requise ; sa coopération est toutefois attendue par la fourniture des documents, informations ou preuves nécessaires à la procédure.",
              },
            ],
            [
              { type: "strong", text: '"Liste des Prix" :' },
              {
                type: "text",
                text: " l'annexe jointe aux présentes CG, précisant les devises acceptées, les modes de paiement et l'ensemble des frais facturés par ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". La Liste des Prix est publiée sur " },
              { type: "link", href: "/prices", label: "notre page Prix" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: '"Règlement 261/04" :' },
              {
                type: "text",
                text: " le Règlement (CE) n° 261/2004 du Parlement européen et du Conseil du 11 février 2004 établissant des règles communes en matière d'indemnisation et d'assistance des passagers en cas de refus d'embarquement et d'annulation ou de retard important d'un vol.",
              },
            ],
            [
              { type: "strong", text: '"Réclamation" :' },
              {
                type: "text",
                text: " toute demande d'indemnisation financière formée contre une compagnie aérienne au titre du Règlement (CE) n° 261/2004 du Parlement européen et du Conseil.",
              },
            ],
            [
              { type: "strong", text: '"Exigences en matière de Confidentialité et de Protection des Données" :' },
              {
                type: "text",
                text: " l'ensemble des lois et règlements applicables au traitement des données personnelles et à la vie privée, y compris, le cas échéant, les lignes directrices et codes de bonne pratique émis par les autorités de contrôle compétentes, ainsi que tout instrument équivalent dans toute juridiction pertinente.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Les définitions ci-dessus s'appliquent à la conclusion et à l'exécution de tout document ou de toute opération en lien avec les CG.",
            },
          ],
        },
      ],
    },
    {
      title: "Article 1. Formulaire de Cession",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              {
                type: "text",
                text: " Le Client accepte les CG (le Formulaire de Cession), qui constituent le fondement de tout autre document conclu librement entre le Client et ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " utilise un service d'authentification en ligne pour signatures électroniques avancées conforme aux exigences de l'article 26 du Règlement sur l'identification électronique, reconnu et accepté au niveau international, y compris par les tribunaux ; le Client n'a donc pas à imprimer, signer et renvoyer le Formulaire de Cession par courrier recommandé.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " En concluant un Contrat, le Client confirme qu'il est autorisé et juridiquement capable de signer des documents engageant à la fois ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " et lui-même ou, le cas échéant, qu'il a le droit de signer au nom d'une autre personne (par exemple un enfant).",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " Le Client s'engage à fournir à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " toutes les données et informations nécessaires au recouvrement de l'Indemnisation auprès du transporteur aérien effectif.",
              },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " n'est habilitée à accepter que des Indemnisations en numéraire ; aucun bon de voyage ni autre service proposé par le transporteur aérien effectif ne sera accepté.",
              },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " Le Client garantit que l'indemnisation n'a pas été cédée à des tiers et qu'aucun litige entre le Client et la compagnie aérienne portant sur le même objet n'est ou ne sera pendant.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " Après la signature du Formulaire de Cession, le Client doit cesser toute négociation avec la compagnie aérienne concernée et rediriger tout contact de celle-ci vers ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", afin que " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " obtienne le meilleur résultat possible." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " Le Client confirme et déclare que les CG constituent une preuve directe et l'expression de sa volonté réelle, qui doit être respectée par les transporteurs aériens effectifs. Le Client convient avec ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " que tous les paiements d'Indemnisation effectués par les transporteurs effectifs au titre des Réclamations de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " soient versés directement sur les comptes bancaires détenus par " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou sur d'autres comptes convenus entre " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " et le Client." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " Le Client accepte également que " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " l'assiste dans l'exercice de son droit à faire valoir ses intérêts lors du recouvrement de l'Indemnisation.",
              },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " Si le Client reçoit des paiements directs ou toute autre compensation de la compagnie aérienne concernée après la conclusion du Contrat, il est tenu d'en informer sans délai ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". Ces paiements sont considérés comme une indemnisation et donnent à " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " le droit de réclamer les honoraires de service et les honoraires de contentieux si " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a introduit une action en justice avant que le Client n'ait reçu le paiement de la compagnie aérienne concernée.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 2. Description du Service d'Assistance Juridique",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "2.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " soumet la demande d'indemnisation du Client à la compagnie aérienne qui exploite le vol, sur le fondement du Règlement 261/2004 ou de toute autre réglementation relative aux droits des passagers aériens applicable au vol concerné.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Les données et informations de vol peuvent être transmises à " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " via le site web, par e-mail ou par téléphone." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " Pour donner suite à la réclamation, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " exige que le Client signe le Formulaire de Cession, qui peut être transmis via le formulaire en ligne, par e-mail ou par voie postale. Une fois le Formulaire de Cession reçu, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " agira en son nom propre et pour son propre compte afin de faire valoir la créance cédée auprès de la compagnie aérienne.",
              },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " Si aucun règlement amiable n'est trouvé avec le transporteur aérien effectif concernant la Réclamation, ou dans d'autres cas où, de l'avis de ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", le recouvrement de l'Indemnisation serait plus efficace ou plus rapide par cette voie, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " est en droit d'engager une action en justice, ce qui entraînera une augmentation de la part de l'Indemnisation lui revenant, telle que précisée dans la ",
              },
              { type: "link", href: "/prices", label: "Liste des Prix" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "2.5." },
              {
                type: "text",
                text: " Si un représentant légal mandaté intervient dans la procédure contentieuse, le Client accepte d'autoriser ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " à lui donner accès à toutes les informations pertinentes du dossier et à permettre à ce représentant d'informer ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " de l'avancement de l'affaire. Si le tribunal exige des certificats d'authentification, des procurations, des déclarations sur l'honneur, des Formulaires de Cession ou tout autre document, le Client accepte de les signer. Si le Client a déjà signé un Formulaire de Cession, il est convenu que la réclamation lui est automatiquement rétrocédée avant la signature de tels documents complémentaires.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " Si " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ou son représentant légal mandaté estime que la réclamation n'est pas suffisamment fondée, le dossier sera clôturé et le Client en sera informé.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " Si " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou le représentant légal mandaté engage une action en justice, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " prendra en charge les frais engagés en cas de perte du procès. En cas de succès du procès ou de règlement amiable, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " prendra en charge les frais non remboursés par la compagnie aérienne." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " Le Client reconnaît que le traitement de la Réclamation peut prendre un temps considérable et que " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ne peut influer sur la rapidité avec laquelle la Réclamation aboutit." },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 3. Frais et Paiements",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Notre service est fourni sur une base " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: ", conformément à l'" },
            { type: "link", href: "/documents/no-win-no-fee", label: "Accord No win, no fee" },
            { type: "text", text: ". Tous les frais applicables figurent dans la " },
            { type: "link", href: "/prices", label: "Liste des Prix" },
            { type: "text", text: "." },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "3.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " fournit une assistance juridique gratuite, sauf lorsque " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " obtient effectivement une indemnisation. En cas de succès, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " transférera au Client la part convenue de l'indemnisation, sous réserve des frais applicables indiqués dans la Liste des Prix.",
              },
            ],
            [
              { type: "strong", text: "3.2." },
              {
                type: "text",
                text: " La part convenue de l'indemnisation sera versée au Client selon les options précisées dans la Liste des Prix.",
              },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " Si le Client a fourni des informations incorrectes ou insuffisantes nécessaires au versement de l'indemnisation, que le paiement est retourné à ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " et que le Client ne répond pas après plusieurs notifications et efforts raisonnables de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " pour le joindre par d'autres moyens que l'e-mail communiqué, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " est en droit de conserver la part de l'indemnisation qui aurait dû être transférée au Client.",
              },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Une fois que " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " a versé l'indemnisation convenue conformément aux instructions et au mode de paiement choisis par le Client, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " n'est pas responsable : (i) des problèmes liés aux chèques, cartes de débit prépayées, cartes de crédit ou autres pertes survenues lors de l'acheminement vers le Client ; ni (ii) des conséquences résultant de la communication par le Client de coordonnées bancaires erronées, d'une adresse incorrecte ou d'erreurs similaires, y compris, sans s'y limiter, le versement de l'indemnisation à un destinataire erroné. Si l'indemnisation est versée à un destinataire erroné du fait d'une erreur du Client, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " n'est pas tenue d'en poursuivre activement le recouvrement." },
            ],
            [
              { type: "strong", text: "3.5." },
              {
                type: "text",
                text: " Aucun intérêt ne peut être réclamé pour la période comprise entre la réception et le versement de l'indemnisation. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " se réserve le droit de conserver les intérêts recouvrés auprès de la compagnie aérienne.",
              },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " n'est responsable d'aucune indemnisation, d'aucun dommage ni d'aucune réclamation connexe si elle se trouve dans l'impossibilité de transférer le paiement au Client en raison d'un événement échappant à son contrôle raisonnable, y compris, sans s'y limiter, les grèves, conflits sociaux, catastrophes naturelles, guerres, émeutes, troubles civils, sabotages intentionnels, respect de lois ou d'ordres, règlements, dispositions ou instructions gouvernementaux, accidents, pannes d'installations ou de machines, incendies, inondations ou tempêtes.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " Le siège social de " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " étant situé au Portugal, le montant de la taxe sur la valeur ajoutée (TVA), le cas échéant, est déterminé par le droit portugais, au taux légalement applicable.",
              },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " Pour les comptes situés dans l'Espace unique de paiement en euros (SEPA), tous les paiements sont effectués par virement bancaire. En cas de virement international vers le Client, l'ensemble des frais bancaires est déduit de la part de l'Indemnisation revenant au Client.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              {
                type: "text",
                text: " Afin de limiter les frais bancaires, en cas de réservation partagée ou dans d'autres cas (par exemple, des parents percevant les sommes dues à leurs enfants), ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " transférera l'ensemble des paiements sur un compte unique si le Client l'y autorise ou si un compte unique est indiqué lors de la transmission des données à ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ". La personne qui reçoit des sommes pour le compte d'autres personnes est tenue de procéder au règlement envers celles-ci et, dans ce cas, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " n'assume pas le risque de non-paiement." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " L'Indemnisation et tout autre paiement ne seront versés par " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " qu'aux bénéficiaires finaux en droit de réclamer l'Indemnisation. " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " n'effectuera aucun paiement à des intermédiaires, agences, représentants ou autres tiers, sauf s'ils fournissent une documentation écrite spécifique confirmant clairement et sans ambiguïté leur pouvoir de recevoir des paiements pour le compte du bénéficiaire final. En cas de doute quant au droit de percevoir des paiements, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " se réserve le droit d'exiger des preuves complémentaires et peut, à sa discrétion, refuser d'effectuer des paiements directs à ces personnes.",
              },
            ],
            [
              { type: "strong", text: "3.11." },
              {
                type: "text",
                text: " Si le Client reçoit un paiement ou toute autre forme d'Indemnisation, par exemple un bon de vol, de la part du transporteur aérien effectif après avoir eu recours aux services de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", il est tenu d'en informer immédiatement " },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". Dans ce cas, le Client devra verser à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " la rémunération indiquée dans la Liste des Prix dans un délai de 10 (dix) jours à compter du jour de la réception de l'Indemnisation du transporteur aérien effectif, sur le compte bancaire indiqué sur le site web de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " ou sur tout autre compte bancaire communiqué par écrit par " },
              { type: "brand", field: "brandName" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 4. Protection des Données Personnelles",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " Le Client garantit que les données et informations fournies à " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " dans le cadre de la Réclamation sont exactes, complètes, véridiques et non trompeuses. Le Client garantit " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " contre toute réclamation résultant d'informations inexactes fournies par le Client ou d'un défaut de coopération ou d'une coopération inadéquate de sa part.",
              },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " peut également collecter des données personnelles à des fins complémentaires, telles que l'analyse statistique, l'administration, la communication, la gestion et la sécurité informatiques, la sécurité physique, les processus d'authentification et d'autorisation, les systèmes de support, la coordination interne des projets et des équipes ainsi que les activités organisationnelles. Toutes les données personnelles sont collectées conformément au Règlement général sur la protection des données, Règlement (UE) 2016/679 (voir notre ",
              },
              { type: "link", href: "/privacy-policy", label: "Politique de Confidentialité" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " Le Client fournit à " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " des données personnelles conformément au Règlement général sur la protection des données ou à toute autre législation applicable en matière de protection des données, en donnant son consentement explicite au traitement et à l'utilisation de ces données dans le cadre du Contrat. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ne partagera de données personnelles avec des tiers que lorsque : (i) le Client y a consenti ; (ii) cela est nécessaire à une finalité directement liée au motif initial de la collecte des données ; (iii) cela est nécessaire à la préparation, à la négociation et à l'exécution du contrat conclu avec le Client ; (iv) cela est exigé par une obligation légale ou par une décision administrative ou judiciaire ; (v) cela est nécessaire à la constatation ou à la défense de droits en justice ou en réponse à des actions judiciaires ; ou (vi) cela est nécessaire pour prévenir des usages abusifs ou d'autres activités illicites, telles que des attaques délibérées, afin d'assurer la protection des données.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Dans le cadre de la relation contractuelle établie au titre des présentes CG, " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " peut, ponctuellement, adresser au Client des communications liées au service en utilisant les coordonnées fournies, notamment par e-mail. Ces communications peuvent comporter des informations sur d'autres réclamations que le Client serait éventuellement en droit d'introduire au titre de la réglementation applicable aux droits des passagers aériens, sur la base de l'analyse par ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " de données de dossiers antérieurs ou d'informations de vol publiquement disponibles. Ces messages visent uniquement à aider le Client à exercer ses droits et sont considérés comme relevant de l'intérêt légitime de ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " à fournir des services pertinents et connexes." },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le Client peut s'opposer à tout moment à la réception de ces communications en cliquant sur le lien de désabonnement inclus dans chaque message ou en contactant ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " à l'adresse " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "Article 5. Droit de rétractation",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              {
                type: "text",
                text: " La relation contractuelle entre les parties prend fin lorsque le Contrat est intégralement exécuté, c'est-à-dire lorsque le paiement prévu au Contrat est intégralement effectué.",
              },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " Si vous avez la qualité de consommateur au sens de la réglementation européenne de la consommation, c'est-à-dire si vous êtes une personne physique concluant un acte juridique à des fins qui n'entrent pas dans le cadre d'une activité commerciale ou professionnelle indépendante, vous disposez d'un droit légal de rétractation.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " Le Contrat prend fin immédiatement : (i) lorsque " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " estime, après un examen approfondi de la Réclamation, que celle-ci pourrait ne pas aboutir, le Client étant informé de cette décision ; (ii) en cas de données ou d'informations inexactes et de comportement frauduleux du Client, sur décision de ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ; ou (iii) si, dans un délai de 14 (quatorze) jours à compter de la conclusion du Contrat, le Client, en sa qualité de consommateur, adresse une notification de rétractation par e-mail. Ce droit de résiliation prend fin par anticipation si le Contrat est intégralement exécuté avant l'expiration de ce délai.",
              },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " Vous pouvez revenir sur votre acceptation de notre Contrat dans un délai de 14 jours à compter de sa conclusion (par exemple par courrier ou par e-mail), sans avoir à motiver votre décision. Pour exercer votre droit de rétractation, celle-ci doit être communiquée dans ce délai de 14 jours et indiquer clairement que vous souhaitez vous rétracter du Contrat. En raison de la nature du service fourni, vous ne pouvez plus vous rétracter dès lors que nous vous avons informé que la compagnie aérienne concernée a accepté la réclamation, le service demandé ayant alors déjà été exécuté. La rétractation peut être adressée à notre adresse e-mail ",
              },
              { type: "email" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 6. Dispositions Finales",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "6.1." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " est autorisée à modifier les CG et à fixer des conditions supplémentaires à tout moment et sans préavis, tout en s'efforçant de tenir le Client informé de telles modifications. Si ces modifications sont défavorables au Client, celui-ci devra les approuver pour que les CG modifiées lui soient applicables.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " Le droit de la République portugaise s'applique aux CG, au Contrat et à tout autre document conclu en lien avec les CG et le Contrat, sauf stipulation contraire dans le document concerné. Le Client, en qualité de consommateur, peut également se prévaloir de la protection résultant des dispositions impératives du droit du pays dans lequel il réside.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " utilisera les données personnelles du Client et, le cas échéant, de ses salariés exclusivement aux fins de faire valoir la Réclamation. Toutes les informations relatives à l'étendue et aux modalités de collecte, de conservation et d'utilisation des données personnelles figurent dans notre ",
              },
              { type: "link", href: "/privacy-policy", label: "Politique de Confidentialité" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              {
                type: "text",
                text: " Lorsque le Client est une personne morale, il garantit et déclare que : (i) les données personnelles fournies à ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " ont été collectées et sont fournies, à tout moment, dans le respect des Exigences en matière de Confidentialité et de Protection des Données ; et (ii) aux fins du présent Contrat, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " agira en qualité de sous-traitant et non de responsable du traitement (au sens des Exigences en matière de Confidentialité et de Protection des Données) pour l'ensemble des activités de traitement réalisées au titre du présent Contrat.",
              },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " Si une disposition des CG est jugée illégale, invalide ou inapplicable par une juridiction étatique ou arbitrale, les autres dispositions des CG demeurent pleinement en vigueur. Toute disposition jugée illégale, invalide ou inapplicable seulement en partie, ou dans une certaine mesure, demeure pleinement en vigueur pour le surplus. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " modifiera les CG en remplaçant ces dispositions par des dispositions légales, valides et applicables produisant un résultat aussi proche que possible des intentions de ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " et du Client." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " est autorisée à modifier les présentes CG et la Liste des Prix ainsi qu'à fixer des conditions supplémentaires à tout moment et sans notification. Toutefois, les modifications ayant un effet défavorable pour le Client ne lui seront pas applicables, sauf s'il les accepte.",
              },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Lorsque le droit national restreint ou interdit la cession de créances, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " agira en coopération avec des représentants légaux locaux, conformément à la réglementation locale applicable.",
              },
            ],
            [
              { type: "strong", text: "6.8." },
              {
                type: "text",
                text: " Les droits et obligations liés en tout ou partie à toute réclamation introduite peuvent être transférés sans restriction par ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " à toute entité du groupe de sociétés " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " et par " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " à des tiers." },
            ],
          ],
        },
      ],
    },
    {
      title: "Annexe n° 1 - Liste des Prix",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "La Liste des Prix fait partie intégrante des présentes CG et est publiée sur " },
            { type: "link", href: "/prices", label: "notre page Prix" },
            {
              type: "text",
              text: ". Elle précise les devises acceptées, les modes de paiement disponibles et l'ensemble des frais facturés par ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: ", y compris les honoraires de résultat et les honoraires supplémentaires de 20 % en cas de contentieux.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Les conditions commerciales de notre convention d'honoraires figurent dans l'" },
            { type: "link", href: "/documents/no-win-no-fee", label: "Accord No win, no fee" },
            { type: "text", text: ". Toute question relative aux présentes CG peut être adressée à " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Version 4.0 du document. Dernière mise à jour: septembre 2026",
};
