const products = [
  {
    id: 1,
    name: "Dirt Boy Tee",
    category: "Apparel",
    price: "$35",
    emoji: "👕",
    description:
      "Classic crew neck tee featuring the Dirt Boy Vol. 1 logo. Premium cotton blend.",
  },
  {
    id: 2,
    name: "DG Snapback Hat",
    category: "Accessories",
    price: "$30",
    emoji: "🧢",
    description:
      "Structured snapback with embroidered gold DG monogram. One size fits most.",
  },
  {
    id: 3,
    name: "Country Roads Hoodie",
    category: "Apparel",
    price: "$65",
    emoji: "🧥",
    description:
      "Heavyweight fleece pullover hoodie. Bold Drew Green graphic on back.",
  },
];

export default function MerchSection() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="merch" className="py-20 md:py-28 bg-[oklch(0.085_0_0)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up text-center mb-12">
          <p className="text-[oklch(0.70_0.12_75)] font-body tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            Shop
          </p>
          <h2 className="section-heading text-4xl md:text-5xl gold-text mb-4">
            Merch
          </h2>
          <div className="w-16 h-0.5 bg-[oklch(0.70_0.12_75)] mx-auto mb-4" />
          <p className="font-body text-[oklch(0.55_0_0)] text-sm">
            Interested in merchandise? Contact us to place an order.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="fade-in-up glass-card rounded-2xl overflow-hidden hover:border-[oklch(0.70_0.12_75/0.4)] hover:shadow-gold transition-all duration-300 group"
              data-ocid={`merch.item.${product.id}`}
            >
              <div
                className="w-full aspect-[4/3] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.14 0.022 55), oklch(0.10 0.015 55))",
                }}
              >
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[oklch(0.70_0.12_75)] font-body text-xs tracking-[0.15em] uppercase">
                      {product.category}
                    </p>
                    <h3 className="font-display font-bold text-[oklch(0.92_0_0)] text-lg">
                      {product.name}
                    </h3>
                  </div>
                  <span className="font-display font-bold gold-text text-xl">
                    {product.price}
                  </span>
                </div>
                <p className="font-body text-[oklch(0.55_0_0)] text-sm mb-4">
                  {product.description}
                </p>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="w-full py-2.5 font-body font-semibold text-sm tracking-[0.1em] uppercase border border-[oklch(0.70_0.12_75/0.5)] text-[oklch(0.70_0.12_75)] hover:bg-[oklch(0.70_0.12_75/0.15)] rounded-lg transition-all duration-300"
                  data-ocid="merch.button"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
