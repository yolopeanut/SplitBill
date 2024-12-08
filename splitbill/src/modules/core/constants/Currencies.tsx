const Currencies: {
	shortform: string;
	elaboration: string;
	dollarSign: string;
}[] = [
	{ shortform: "AED", elaboration: "United Arab Emirates Dirham", dollarSign: "د.إ" },
	{ shortform: "AFN", elaboration: "Afghan Afghani", dollarSign: "؋" },
	{ shortform: "ALL", elaboration: "Albanian Lek", dollarSign: "L" },
	{ shortform: "AMD", elaboration: "Armenian Dram", dollarSign: "֏" },
	{ shortform: "ANG", elaboration: "Netherlands Antillean Guilder", dollarSign: "ƒ" },
	{ shortform: "AOA", elaboration: "Angolan Kwanza", dollarSign: "Kz" },
	{ shortform: "ARS", elaboration: "Argentine Peso", dollarSign: "$" },
	{ shortform: "AUD", elaboration: "Australian Dollar", dollarSign: "$" },
	{ shortform: "AWG", elaboration: "Aruban Florin", dollarSign: "ƒ" },
	{ shortform: "AZN", elaboration: "Azerbaijani Manat", dollarSign: "₼" },
	{ shortform: "BAM", elaboration: "Bosnia and Herzegovina Convertible Mark", dollarSign: "KM" },
	{ shortform: "BBD", elaboration: "Barbadian Dollar", dollarSign: "$" },
	{ shortform: "BDT", elaboration: "Bangladeshi Taka", dollarSign: "৳" },
	{ shortform: "BGN", elaboration: "Bulgarian Lev", dollarSign: "лв" },
	{ shortform: "BHD", elaboration: "Bahraini Dinar", dollarSign: ".د.ب" },
	{ shortform: "BIF", elaboration: "Burundian Franc", dollarSign: "Fr" },
	{ shortform: "BMD", elaboration: "Bermudian Dollar", dollarSign: "$" },
	{ shortform: "BND", elaboration: "Brunei Dollar", dollarSign: "$" },
	{ shortform: "BOB", elaboration: "Bolivian Boliviano", dollarSign: "Bs" },
	{ shortform: "BRL", elaboration: "Brazilian Real", dollarSign: "R$" },
	{ shortform: "BSD", elaboration: "Bahamian Dollar", dollarSign: "$" },
	{ shortform: "BTN", elaboration: "Bhutanese Ngultrum", dollarSign: "Nu." },
	{ shortform: "BWP", elaboration: "Botswana Pula", dollarSign: "P" },
	{ shortform: "BYN", elaboration: "Belarusian Ruble", dollarSign: "Br" },
	{ shortform: "BZD", elaboration: "Belize Dollar", dollarSign: "BZ$" },
	{ shortform: "CAD", elaboration: "Canadian Dollar", dollarSign: "$" },
	{ shortform: "CDF", elaboration: "Congolese Franc", dollarSign: "Fr" },
	{ shortform: "CHF", elaboration: "Swiss Franc", dollarSign: "CHF" },
	{ shortform: "CLP", elaboration: "Chilean Peso", dollarSign: "$" },
	{ shortform: "CNY", elaboration: "Chinese Yuan", dollarSign: "¥" },
	{ shortform: "COP", elaboration: "Colombian Peso", dollarSign: "$" },
	{ shortform: "CRC", elaboration: "Costa Rican Colón", dollarSign: "₡" },
	{ shortform: "CUP", elaboration: "Cuban Peso", dollarSign: "$" },
	{ shortform: "CVE", elaboration: "Cape Verdean Escudo", dollarSign: "$" },
	{ shortform: "CZK", elaboration: "Czech Koruna", dollarSign: "Kč" },
	{ shortform: "DKK", elaboration: "Danish Krone", dollarSign: "kr" },
	{ shortform: "DOP", elaboration: "Dominican Peso", dollarSign: "$" },
	{ shortform: "DZD", elaboration: "Algerian Dinar", dollarSign: "د.ج" },
	{ shortform: "EGP", elaboration: "Egyptian Pound", dollarSign: "ج.م" },
	{ shortform: "ERN", elaboration: "Eritrean Nakfa", dollarSign: "Nkf" },
	{ shortform: "ETB", elaboration: "Ethiopian Birr", dollarSign: "Br" },
	{ shortform: "EUR", elaboration: "Euro", dollarSign: "€" },
	{ shortform: "FJD", elaboration: "Fijian Dollar", dollarSign: "$" },
	{ shortform: "FKP", elaboration: "Falkland Islands Pound", dollarSign: "£" },
	{ shortform: "GBP", elaboration: "British Pound Sterling", dollarSign: "£" },
	{ shortform: "GEL", elaboration: "Georgian Lari", dollarSign: "₾" },
	{ shortform: "GHS", elaboration: "Ghanaian Cedi", dollarSign: "₵" },
	{ shortform: "GIP", elaboration: "Gibraltar Pound", dollarSign: "£" },
	{ shortform: "GMD", elaboration: "Gambian Dalasi", dollarSign: "D" },
	{ shortform: "GNF", elaboration: "Guinean Franc", dollarSign: "Fr" },
	{ shortform: "GTQ", elaboration: "Guatemalan Quetzal", dollarSign: "Q" },
	{ shortform: "GYD", elaboration: "Guyanese Dollar", dollarSign: "$" },
	{ shortform: "HKD", elaboration: "Hong Kong Dollar", dollarSign: "$" },
	{ shortform: "HNL", elaboration: "Honduran Lempira", dollarSign: "L" },
	{ shortform: "HRK", elaboration: "Croatian Kuna", dollarSign: "kn" },
	{ shortform: "HTG", elaboration: "Haitian Gourde", dollarSign: "G" },
	{ shortform: "HUF", elaboration: "Hungarian Forint", dollarSign: "Ft" },
	{ shortform: "IDR", elaboration: "Indonesian Rupiah", dollarSign: "Rp" },
	{ shortform: "ILS", elaboration: "Israeli New Shekel", dollarSign: "₪" },
	{ shortform: "INR", elaboration: "Indian Rupee", dollarSign: "₹" },
	{ shortform: "IQD", elaboration: "Iraqi Dinar", dollarSign: "ع.د" },
	{ shortform: "IRR", elaboration: "Iranian Rial", dollarSign: "﷼" },
	{ shortform: "ISK", elaboration: "Icelandic Króna", dollarSign: "kr" },
	{ shortform: "JMD", elaboration: "Jamaican Dollar", dollarSign: "J$" },
	{ shortform: "JPY", elaboration: "Japanese Yen", dollarSign: "¥" },
	{ shortform: "KES", elaboration: "Kenyan Shilling", dollarSign: "KSh" },
	{ shortform: "KGS", elaboration: "Kyrgyzstani Som", dollarSign: "с" },
	{ shortform: "KHR", elaboration: "Cambodian Riel", dollarSign: "៛" },
	{ shortform: "KPW", elaboration: "North Korean Won", dollarSign: "₩" },
	{ shortform: "KRW", elaboration: "South Korean Won", dollarSign: "₩" },
	{ shortform: "KWD", elaboration: "Kuwaiti Dinar", dollarSign: "د.ك" },
	{ shortform: "KYD", elaboration: "Cayman Islands Dollar", dollarSign: "$" },
	{ shortform: "KZT", elaboration: "Kazakhstani Tenge", dollarSign: "₸" },
	{ shortform: "LAK", elaboration: "Laotian Kip", dollarSign: "₭" },
	{ shortform: "LBP", elaboration: "Lebanese Pound", dollarSign: "ل.ل" },
	{ shortform: "LKR", elaboration: "Sri Lankan Rupee", dollarSign: "Rs" },
	{ shortform: "LRD", elaboration: "Liberian Dollar", dollarSign: "$" },
	{ shortform: "LSL", elaboration: "Lesotho Loti", dollarSign: "L" },
	{ shortform: "LYD", elaboration: "Libyan Dinar", dollarSign: "ل.د" },
	{ shortform: "MAD", elaboration: "Moroccan Dirham", dollarSign: "د.م." },
	{ shortform: "MDL", elaboration: "Moldovan Leu", dollarSign: "L" },
	{ shortform: "MGA", elaboration: "Malagasy Ariary", dollarSign: "Ar" },
	{ shortform: "MKD", elaboration: "Macedonian Denar", dollarSign: "ден" },
	{ shortform: "MMK", elaboration: "Myanmar Kyat", dollarSign: "K" },
	{ shortform: "MNT", elaboration: "Mongolian Tögrög", dollarSign: "₮" },
	{ shortform: "MOP", elaboration: "Macanese Pataca", dollarSign: "MOP$" },
	{ shortform: "MRU", elaboration: "Mauritanian Ouguiya", dollarSign: "UM" },
	{ shortform: "MUR", elaboration: "Mauritian Rupee", dollarSign: "₨" },
	{ shortform: "MVR", elaboration: "Maldivian Rufiyaa", dollarSign: "Rf" },
	{ shortform: "MWK", elaboration: "Malawian Kwacha", dollarSign: "MK" },
	{ shortform: "MXN", elaboration: "Mexican Peso", dollarSign: "$" },
	{ shortform: "MYR", elaboration: "Malaysian Ringgit", dollarSign: "RM" },
	{ shortform: "NPR", elaboration: "Nepalese Rupee", dollarSign: "Rs" },
	{ shortform: "NZD", elaboration: "New Zealand Dollar", dollarSign: "$" },
	{ shortform: "OMR", elaboration: "Omani Rial", dollarSign: "ر.ع." },
	{ shortform: "PAB", elaboration: "Panamanian Balboa", dollarSign: "B/." },
	{ shortform: "PEN", elaboration: "Peruvian Sol", dollarSign: "S/" },
	{ shortform: "PGK", elaboration: "Papua New Guinean Kina", dollarSign: "K" },
	{ shortform: "PHP", elaboration: "Philippine Peso", dollarSign: "₱" },
	{ shortform: "PKR", elaboration: "Pakistani Rupee", dollarSign: "Rs" },
	{ shortform: "PLN", elaboration: "Polish Zloty", dollarSign: "zł" },
	{ shortform: "PYG", elaboration: "Paraguayan Guarani", dollarSign: "₲" },
	{ shortform: "QAR", elaboration: "Qatari Rial", dollarSign: "ر.ق" },
	{ shortform: "RON", elaboration: "Romanian Leu", dollarSign: "lei" },
	{ shortform: "RSD", elaboration: "Serbian Dinar", dollarSign: "дин" },
	{ shortform: "RUB", elaboration: "Russian Ruble", dollarSign: "₽" },
	{ shortform: "RWF", elaboration: "Rwandan Franc", dollarSign: "Fr" },
	{ shortform: "SAR", elaboration: "Saudi Riyal", dollarSign: "ر.س" },
	{ shortform: "SBD", elaboration: "Solomon Islands Dollar", dollarSign: "$" },
	{ shortform: "SCR", elaboration: "Seychellois Rupee", dollarSign: "₨" },
	{ shortform: "SDG", elaboration: "Sudanese Pound", dollarSign: "ج.س" },
	{ shortform: "SEK", elaboration: "Swedish Krona", dollarSign: "kr" },
	{ shortform: "SGD", elaboration: "Singapore Dollar", dollarSign: "$" },
	{ shortform: "SHP", elaboration: "Saint Helena Pound", dollarSign: "£" },
	{ shortform: "SLL", elaboration: "Sierra Leonean Leone", dollarSign: "Le" },
	{ shortform: "SOS", elaboration: "Somali Shilling", dollarSign: "S" },
	{ shortform: "SRD", elaboration: "Surinamese Dollar", dollarSign: "$" },
	{ shortform: "SSP", elaboration: "South Sudanese Pound", dollarSign: "£" },
	{ shortform: "STN", elaboration: "São Tomé and Príncipe Dobra", dollarSign: "Db" },
	{ shortform: "SVC", elaboration: "Salvadoran Colón", dollarSign: "$" },
	{ shortform: "SZL", elaboration: "Swazi Lilangeni", dollarSign: "L" },
	{ shortform: "THB", elaboration: "Thai Baht", dollarSign: "฿" },
	{ shortform: "TJS", elaboration: "Tajikistani Somoni", dollarSign: "ЅМ" },
	{ shortform: "TMT", elaboration: "Turkmenistani Manat", dollarSign: "m" },
	{ shortform: "TND", elaboration: "Tunisian Dinar", dollarSign: "د.ت" },
	{ shortform: "TOP", elaboration: "Tongan Paʻanga", dollarSign: "T$" },
	{ shortform: "TRY", elaboration: "Turkish Lira", dollarSign: "₺" },
	{ shortform: "TTD", elaboration: "Trinidad and Tobago Dollar", dollarSign: "$" },
	{ shortform: "TWD", elaboration: "New Taiwan Dollar", dollarSign: "NT$" },
	{ shortform: "TZS", elaboration: "Tanzanian Shilling", dollarSign: "TSh" },
	{ shortform: "UAH", elaboration: "Ukrainian Hryvnia", dollarSign: "₴" },
	{ shortform: "UGX", elaboration: "Ugandan Shilling", dollarSign: "USh" },
	{ shortform: "USD", elaboration: "United States Dollar", dollarSign: "$" },
	{ shortform: "UYU", elaboration: "Uruguayan Peso", dollarSign: "$" },
	{ shortform: "UZS", elaboration: "Uzbekistani Som", dollarSign: "лв" },
	{ shortform: "VEF", elaboration: "Venezuelan Bolívar", dollarSign: "Bs" },
	{ shortform: "VND", elaboration: "Vietnamese Dong", dollarSign: "₫" },
	{ shortform: "VUV", elaboration: "Vanuatu Vatu", dollarSign: "Vt" },
	{ shortform: "WST", elaboration: "Samoan Tala", dollarSign: "T" },
	{ shortform: "XAF", elaboration: "Central African CFA Franc", dollarSign: "Fr" },
	{ shortform: "XCD", elaboration: "East Caribbean Dollar", dollarSign: "$" },
	{ shortform: "XOF", elaboration: "West African CFA Franc", dollarSign: "Fr" },
	{ shortform: "XPF", elaboration: "CFP Franc", dollarSign: "Fr" },
	{ shortform: "YER", elaboration: "Yemeni Rial", dollarSign: "ر.ي" },
	{ shortform: "ZAR", elaboration: "South African Rand", dollarSign: "R" },
	{ shortform: "ZMW", elaboration: "Zambian Kwacha", dollarSign: "ZK" },
	{ shortform: "ZWL", elaboration: "Zimbabwean Dollar", dollarSign: "$" },
];

export default Currencies;
