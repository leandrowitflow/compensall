import type { LegalDocument } from "./types";

export const termsEn: LegalDocument = {
  intro: {
    type: "callout",
    content: [
      { type: "strong", text: "Summary:" },
      { type: "text", text: " These Terms and Conditions govern your relationship with " },
      { type: "brand", field: "brandName" },
      {
        type: "text",
        text: ". We work on a No win, no fee basis: our legal assistance costs you nothing unless we successfully recover your compensation. If the claim has to go to litigation, an additional success-based fee of 20% applies, payable only if the case succeeds. All fees are set out in the ",
      },
      { type: "link", href: "/prices", label: "Price List" },
      { type: "text", text: "." },
    ],
  },
  sections: [
    {
      title: "Definitions",
      blocks: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Unless the context of these General Terms and Conditions requires otherwise, the capitalised terms used in these Terms and Conditions ("T&C") shall have the meanings indicated below:',
            },
          ],
        },
        {
          type: "list",
          items: [
            [
              { type: "strong", text: '"Agreement":' },
              { type: "text", text: " an agreement between the Client and " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", formed upon the Client's acceptance of the T&C. For the provision of Legal Assistance Services, the Agreement is considered valid once the Client has signed the Assignment Form, in addition to accepting these T&C.",
              },
            ],
            [
              { type: "strong", text: '"Compensall":' },
              { type: "text", text: " means a legal entity (" },
              { type: "strongBrand", field: "legalEntityName" },
              { type: "text", text: ", legal registration " },
              { type: "brand", field: "legalEntityNif" },
              { type: "text", text: "), headquartered at " },
              { type: "brand", field: "legalEntityAddress" },
              { type: "text", text: ", with office email " },
              { type: "email" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: '"Air Passenger Rights Regulation":' },
              {
                type: "text",
                text: " any law, regulation, directive or similar instrument, issued at state, EU, federal, national or regional level, which establishes rules for monetary compensation, indemnification or reimbursement of passengers in cases of overbooked, delayed or cancelled flights.",
              },
            ],
            [
              { type: "strong", text: '"Assignment Form":' },
              {
                type: "text",
                text: " the agreement between the Client and ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " that is concluded after the Client has become acquainted with and accepted the T&C, and which is signed electronically or in writing. Under this Agreement the Client gives us exclusive and irrevocable authorisation to initiate and fulfil a claim based on the Client's rights as set out in Regulation (EC) No 261/2004 of the European Parliament and of the Council and related rulings, and to undertake all necessary actions, including to delegate or transfer the claim, to receive payments, and to process, request or supply personal data if necessary, though exclusively with related entities and only for this purpose.",
              },
            ],
            [
              { type: "strong", text: '"Client(s)":' },
              {
                type: "text",
                text: " a person who has signed the Assignment Form, accepted the T&C and is seeking flight compensation.",
              },
            ],
            [
              { type: "strong", text: '"Compensation":' },
              { type: "text", text: " the total amount of money paid by an airline for a claim, whether as compensation, out-of-court settlement, goodwill gesture or otherwise, transferred to the Client or to " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " after the Client has accepted the T&C." },
            ],
            [
              { type: "strong", text: '"Information Service":' },
              { type: "text", text: " the provision of flight-related information by " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", including details about airlines, airports, air passenger rights, consumer protection laws and other travel-related information. The information will be relevant to the Client's travels and may also include broader context, such as airport or airline rankings or updates on changes in air passenger rights. It is provided through electronic communications, including email, personalised electronic billboards, websites controlled by ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", or mobile applications." },
            ],
            [
              { type: "strong", text: '"Litigation":' },
              {
                type: "text",
                text: " if the airline fails to provide a response within two months, or if its response is deemed unsatisfactory upon internal assessment, the claim shall proceed to litigation. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " reserves the exclusive right to determine the most suitable course of action without obligation to justify its decisions, though the Client will be kept informed throughout the process. Due to the significant time and resources required during litigation, an additional success-based fee of 20% shall apply, payable only in the event of a successful outcome. The Client's presence in court will not be required; however, cooperation shall be expected in the form of any documents, information or evidence necessary to support the proceedings.",
              },
            ],
            [
              { type: "strong", text: '"Price List":' },
              {
                type: "text",
                text: " the annex attached to these T&C, specifying the accepted currencies, payment methods and all fees charged by ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ". The Price List is published at " },
              { type: "link", href: "/prices", label: "our Prices page" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: '"Regulation 261/04":' },
              {
                type: "text",
                text: " Regulation (EC) No 261/2004 of the European Parliament and of the Council of 11 February 2004 establishing common rules on compensation and assistance to passengers in the event of denied boarding and of cancellation or long delay of flights.",
              },
            ],
            [
              { type: "strong", text: '"Claim":' },
              {
                type: "text",
                text: " any financial compensation claim made against an airline under Regulation (EC) No 261/2004 of the European Parliament and of the Council.",
              },
            ],
            [
              { type: "strong", text: '"Privacy and Data Protection Requirements":' },
              {
                type: "text",
                text: " all applicable laws and regulations relating to the processing of personal data and privacy, including where applicable the guidance and codes of practice (if any) issued by the relevant supervisory authorities, and the equivalent of any of the foregoing in any relevant jurisdiction.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The above definitions shall be used upon concluding and performing any document or transaction connected with the T&C.",
            },
          ],
        },
      ],
    },
    {
      title: "Article 1. Assignment Form",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "1.1." },
              {
                type: "text",
                text: " The Client accepts the T&C (the Assignment Form), which are considered the basis of any other document to be concluded between the Client and ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " by free will." },
            ],
            [
              { type: "strong", text: "1.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " uses an online authentication service for advanced electronic signatures complying with the requirements set out in Article 26 of the Electronic Identification Regulation, which is internationally recognised and accepted even by courts, so the Client does not have to print, sign and return the Assignment Form by registered mail.",
              },
            ],
            [
              { type: "strong", text: "1.3." },
              {
                type: "text",
                text: " By entering into an Agreement, the Client confirms that he or she is authorised and has legal capacity to sign documents binding both ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " and the Client or, if applicable, has the right to sign on behalf of another person (for example, a child).",
              },
            ],
            [
              { type: "strong", text: "1.4." },
              { type: "text", text: " The Client undertakes to provide " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " with all data and information required for the collection of the Flight Compensation from the operating air carrier.",
              },
            ],
            [
              { type: "strong", text: "1.5." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " shall be entitled to accept only Flight Compensations; no travel vouchers or other services offered by the operating air carrier shall be accepted.",
              },
            ],
            [
              { type: "strong", text: "1.6." },
              {
                type: "text",
                text: " The Client guarantees that the compensation has not been transferred to third parties and that no legal dispute between the Client and the airline on the same matter is pending or will be pending.",
              },
            ],
            [
              { type: "strong", text: "1.7." },
              {
                type: "text",
                text: " After signing the Assignment Form, the Client is required to cease negotiations with the respective airline and to direct any contact from the airline to ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", to ensure that " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " achieves the best possible result." },
            ],
            [
              { type: "strong", text: "1.8." },
              {
                type: "text",
                text: " The Client confirms and declares that the T&C are direct proof and an expression of true will, to be respected by operating air carriers. The Client agrees with ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " that all Flight Compensation payments made by operating carriers under " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " Claims should be made directly to the bank accounts owned by " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " or to other bank accounts as agreed between " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " and the Client." },
            ],
            [
              { type: "strong", text: "1.9." },
              { type: "text", text: " The Client also agrees that " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will assist the Client in the exercise of the right to defend the Client in the collection of the Flight Compensation.",
              },
            ],
            [
              { type: "strong", text: "1.10." },
              {
                type: "text",
                text: " In the event that the Client receives direct payments or any other compensation from the respective airline after the conclusion of the Agreement, the Client is obliged to inform ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " about this without delay. These payments are considered compensation and give " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " the right to claim the service fee and the litigation fee if ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " has filed a lawsuit before the Client received payment from the respective airline.",
              },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 2. Description of the Legal Assistance Service",
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
                text: " submits the Client's compensation claim to the airline operating the flight, based on Regulation 261/2004 or any other air passenger rights regulation applicable to the Client's specific flight.",
              },
            ],
            [
              { type: "strong", text: "2.2." },
              { type: "text", text: " Flight data and information can be sent to " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " through the website, by email or by phone." },
            ],
            [
              { type: "strong", text: "2.3." },
              { type: "text", text: " To proceed with the claim, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " requires the Client to sign the Assignment Form, which can be submitted via the web form, by email or by post. Once the Assignment Form is received, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will act in its own name and on its own behalf to pursue the assigned claim from the airline.",
              },
            ],
            [
              { type: "strong", text: "2.4." },
              {
                type: "text",
                text: " If a settlement agreement with an operating air carrier is not reached regarding the Claim, or in other cases where, in ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: "'s opinion, the Flight Compensation recovery process would be more effective or quicker, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " is entitled to pursue legal action, which will result in an increase of the part of the Flight Compensation belonging to ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: ", as specified in the " },
              { type: "link", href: "/prices", label: "Price List" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "2.5." },
              {
                type: "text",
                text: " If a contracted legal representative is involved in litigation, the Client agrees to grant ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " permission to provide the legal representative with access to all relevant case information, and to allow the legal representative to inform ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " of case progress. Should the court require authentication certificates, powers of attorney, self-declarations, Assignment Forms or other documentation, the Client agrees to sign these. If the Client has already signed an Assignment Form, it is agreed that the claim is automatically transferred back to the Client prior to the signing of any such additional documents.",
              },
            ],
            [
              { type: "strong", text: "2.6." },
              { type: "text", text: " If " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " or its contracted legal representative determines that the claim does not have sufficient merit, the case will be closed and the Client will be informed accordingly.",
              },
            ],
            [
              { type: "strong", text: "2.7." },
              { type: "text", text: " If " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " or the contracted legal representative initiates legal proceedings, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will cover the costs incurred if the lawsuit is lost. If the lawsuit is successful or a settlement is reached, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " will cover any costs not reimbursed by the airline." },
            ],
            [
              { type: "strong", text: "2.8." },
              { type: "text", text: " The Client acknowledges that Claim handling may take considerable time and that " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " cannot influence how quickly the Claim can be asserted." },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 3. Fees and Payments",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Our service is provided on a " },
            { type: "strong", text: "No win, no fee" },
            { type: "text", text: " basis, as set out in the " },
            { type: "link", href: "/documents/no-win-no-fee", label: "No win, no fee Agreement" },
            { type: "text", text: ". All applicable fees are listed in the " },
            { type: "link", href: "/prices", label: "Price List" },
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
              { type: "text", text: " offers legal assistance free of charge, except when " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " successfully collects compensation. If the claim is successful, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will transfer the agreed portion of the compensation to the Client, subject to the applicable fees set out in the Price List.",
              },
            ],
            [
              { type: "strong", text: "3.2." },
              {
                type: "text",
                text: " The agreed portion of the compensation will be paid to the Client according to the options specified in the Price List.",
              },
            ],
            [
              { type: "strong", text: "3.3." },
              {
                type: "text",
                text: " If the Client has provided incorrect or insufficient information necessary for the payment of compensation, the payment is returned to ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ", and the Client fails to respond after several notifications and reasonable efforts by ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " to reach the Client by means other than the email provided, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " has the right to retain the portion of compensation that would have been transferred to the Client.",
              },
            ],
            [
              { type: "strong", text: "3.4." },
              { type: "text", text: " Once " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " has paid the agreed compensation based on the instructions and payment method selected by the Client, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " is not responsible for: (i) issues with cheques, prepaid debit cards, credit cards or other losses during transit to the Client; or (ii) any consequences resulting from the Client providing incorrect bank account details, an incorrect address or similar errors, including but not limited to compensation being paid to the wrong recipient. If compensation is paid to the wrong recipient due to the Client's mistake, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " is not obliged to actively recover it." },
            ],
            [
              { type: "strong", text: "3.5." },
              {
                type: "text",
                text: " Interest cannot be claimed for the period between the receipt and the payment of compensation. ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " reserves the right to retain any interest recovered from the airline." },
            ],
            [
              { type: "strong", text: "3.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " is not responsible for any compensation, damages or related claims if it is unable to transfer the payment to the Client due to an event beyond its reasonable control, including but not limited to strikes, labour disputes, natural disasters, war, riots, civil unrest, intentional sabotage, compliance with laws or government orders, regulations, provisions or instructions, accidents, plant or machinery failures, fires, floods or storms.",
              },
            ],
            [
              { type: "strong", text: "3.7." },
              { type: "text", text: " As the registered office of " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " is located in Portugal, the amount of value added tax (VAT), if applicable, is stipulated by the laws of Portugal in accordance with the legally established rate.",
              },
            ],
            [
              { type: "strong", text: "3.8." },
              {
                type: "text",
                text: " For accounts in the Single Euro Payments Area (SEPA), all payments will be sent to the account by bank transfer. When making an international transfer to the Client, all bank fees are deducted from the Client's part of the Flight Compensation.",
              },
            ],
            [
              { type: "strong", text: "3.9." },
              {
                type: "text",
                text: " To save banking costs, in the case of a shared booking or in other cases (for example, parents being paid for children), ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " shall transfer all payments to a single account if the Client permits it to do so, or if one account is specified when submitting data to ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: ". A person who receives money for other persons is obliged to settle with them and, in such case, ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " does not take the risk of non-payment." },
            ],
            [
              { type: "strong", text: "3.10." },
              { type: "text", text: " Flight Compensation and any other payments will only be made by " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " to the final beneficiaries who are entitled to claim the Flight Compensation. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will not make payments to intermediaries, agencies, representatives or other third parties unless they provide specific written documentation that clearly and unambiguously confirms their authority to accept payments on behalf of the final beneficiary. Where there is any uncertainty regarding the right to receive payments, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " reserves the right to request additional proof and may, at its discretion, refuse to make direct payments to such individuals.",
              },
            ],
            [
              { type: "strong", text: "3.11." },
              {
                type: "text",
                text: " If the Client receives any payment or any other type of Flight Compensation, for example a flight voucher, from the operating air carrier after engaging ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: "'s services, the Client is obliged to inform ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " immediately. In such case, the Client shall pay ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " the remuneration indicated in the Price List within 10 (ten) days from the day the Flight Compensation is received from the operating air carrier, to the bank account provided on the ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " website or any other bank account provided by " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " in writing." },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 4. Personal Data Protection",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "4.1." },
              { type: "text", text: " The Client warrants that the data and information provided to " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " in relation to the Claim is correct, complete, true and not misleading. The Client shall keep " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " indemnified for any claims arising from incorrect information provided by the Client or from a lack of cooperation or improper cooperation by the Client.",
              },
            ],
            [
              { type: "strong", text: "4.2." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " may also collect personal data for additional purposes, such as statistical analysis, administration, communication, IT management and security, physical security, authentication and authorisation processes, support systems, internal project and team coordination, and organisational activities. All personal data is collected in compliance with the General Data Protection Regulation, Regulation (EU) 2016/679 (see our ",
              },
              { type: "link", href: "/privacy-policy", label: "Privacy Policy" },
              { type: "text", text: ")." },
            ],
            [
              { type: "strong", text: "4.3." },
              { type: "text", text: " The Client provides " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " with personal data in accordance with the General Data Protection Regulation or other relevant data protection laws, granting explicit consent for the processing and use of this data within the context of the Agreement. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will share personal data with third parties only where: (i) the Client has given consent; (ii) it is necessary for a purpose directly linked to the initial reason for which the personal data was collected; (iii) it is required for the preparation, negotiation and execution of the agreement with the Client; (iv) it is required by a legal obligation, administrative or court order; (v) it is necessary to establish or defend legal claims or to respond to legal actions; or (vi) it is required to prevent misuse or other illegal activities, such as deliberate attacks, in order to ensure data protection.",
              },
            ],
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "As part of the contractual relationship established under these T&C, " },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: " may, from time to time, send service-related communications to the Client using the contact details provided, including by email. These communications may include information about other potential claims the Client may be entitled to pursue under applicable air passenger rights regulations, based on ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: "'s analysis of past case data or publicly available flight information. Such messages are intended solely to assist the Client in exercising their legal rights and are considered to fall within the scope of ",
            },
            { type: "brand", field: "brandName" },
            {
              type: "text",
              text: "'s legitimate interest in providing relevant and related services.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The Client may opt out of receiving these communications at any time by clicking the unsubscribe link included in each message or by contacting ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: " at " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
    {
      title: "Article 5. Right of withdrawal",
      blocks: [
        {
          type: "list",
          items: [
            [
              { type: "strong", text: "5.1." },
              {
                type: "text",
                text: " The contractual relationship between the parties ends when the Agreement is fully performed, that is, when the payment under the Agreement is fully performed.",
              },
            ],
            [
              { type: "strong", text: "5.2." },
              {
                type: "text",
                text: " If you qualify as a consumer under EU consumer regulations, that is, you are a natural person who undertakes a legal transaction for a purpose that is neither commercial nor an independent professional activity, you have a statutory right of withdrawal.",
              },
            ],
            [
              { type: "strong", text: "5.3." },
              { type: "text", text: " The Agreement is terminated immediately: (i) when " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " considers that the Claim may not be successful after conducting an in-depth review of the Claim, and the Client is informed of such decision; (ii) in the case of incorrect data or information and fraudulent conduct by the Client, upon decision by ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: "; or (iii) if, within 14 (fourteen) days of the conclusion of the Agreement, the Client, being a consumer, submits a withdrawal notice by email. The right to terminate the Agreement on this ground ends prematurely if the Agreement is fully performed before the expiry of that time limit.",
              },
            ],
            [
              { type: "strong", text: "5.4." },
              {
                type: "text",
                text: " You can withdraw your acceptance of our Agreement within 14 days of its conclusion (for example, by letter or email) without needing to give reasons. To exercise your right of withdrawal, it must be communicated within that 14-day period and must clearly state that you wish to withdraw from the Agreement. Due to the nature of the service provided, you cannot withdraw from our Agreement once we have informed you that the airline in question has accepted the claim, as in that case we have already provided the service you requested. The withdrawal can be sent to our email ",
              },
              { type: "email" },
              { type: "text", text: "." },
            ],
          ],
        },
      ],
    },
    {
      title: "Article 6. Final Provisions",
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
                text: " is authorised to alter the T&C and to set out additional conditions at any time and without notice, but shall make efforts to keep the Client updated on any such alterations. If any such alterations are negative from the Client's perspective, the Client shall have to approve them in order for the amended T&C to apply to that Client.",
              },
            ],
            [
              { type: "strong", text: "6.2." },
              {
                type: "text",
                text: " The laws of the Republic of Portugal apply to the T&C, the Agreement and any other document concluded in relation to the T&C and the Agreement, except where otherwise agreed in the specific document. The Client, as a consumer, is also entitled to claim protection under the mandatory provisions of the laws of the country in which the Client resides.",
              },
            ],
            [
              { type: "strong", text: "6.3." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will use the Client's and, if applicable, its employees' personal data exclusively for enforcing the Claim. All information regarding the extent and form of data collection, storage and use of personal data can be found in our ",
              },
              { type: "link", href: "/privacy-policy", label: "Privacy Policy" },
              { type: "text", text: "." },
            ],
            [
              { type: "strong", text: "6.4." },
              {
                type: "text",
                text: " Where the Client is a legal entity, it warrants and represents that: (i) the personal data provided to ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " has been collected and is provided at all times in accordance with the Privacy and Data Protection Requirements; and (ii) for the purposes of this Agreement, ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will act as a data processor rather than as a data controller (as those terms are understood under the Privacy and Data Protection Requirements) in respect of all such data processing activities carried out under this Agreement.",
              },
            ],
            [
              { type: "strong", text: "6.5." },
              {
                type: "text",
                text: " If any provision of the T&C is held to be illegal, invalid or unenforceable by a court or arbitral tribunal, the other provisions of the T&C will remain in full force and effect. Any provision held to be illegal, invalid or unenforceable only in part, or to a certain degree, will remain in full force and effect to the extent that it is not held illegal, invalid or unenforceable. ",
              },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will amend the T&C by replacing such provisions with legal, valid and enforceable provisions that produce a result as close as possible to the intentions of ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " and the Client." },
            ],
            [
              { type: "strong", text: "6.6." },
              { type: "text", text: " " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " is authorised to modify these T&C and the Price List and to set additional conditions at any time and without notification. However, changes with a negative effect on the Client will not apply to that Client unless the Client accepts them.",
              },
            ],
            [
              { type: "strong", text: "6.7." },
              { type: "text", text: " Where national laws restrict or prohibit the assignment of claims, " },
              { type: "brand", field: "brandName" },
              {
                type: "text",
                text: " will act in cooperation with local legal representatives in accordance with applicable local regulations.",
              },
            ],
            [
              { type: "strong", text: "6.8." },
              {
                type: "text",
                text: " The rights and obligations related wholly or partly to any claim filed may be transferred without restriction by ",
              },
              { type: "brand", field: "brandName" },
              { type: "text", text: " to any entity within the " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " group of companies, and by " },
              { type: "brand", field: "brandName" },
              { type: "text", text: " to third parties." },
            ],
          ],
        },
      ],
    },
    {
      title: "Annex No 1 - Price List",
      blocks: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "The Price List forms an integral part of these T&C and is published at " },
            { type: "link", href: "/prices", label: "our Prices page" },
            {
              type: "text",
              text: ". It specifies the accepted currencies, the available payment methods, and all fees charged by ",
            },
            { type: "brand", field: "brandName" },
            { type: "text", text: ", including the success fee and the additional 20% litigation fee." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "The commercial terms of our fee arrangement are set out in the " },
            { type: "link", href: "/documents/no-win-no-fee", label: "No win, no fee Agreement" },
            { type: "text", text: ". Questions about these T&C can be sent to " },
            { type: "email" },
            { type: "text", text: "." },
          ],
        },
      ],
    },
  ],
  footer: "Document version 4.0. Last updated September 2026",
};
