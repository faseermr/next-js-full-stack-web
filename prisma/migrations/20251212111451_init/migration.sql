-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "baseUomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UOM" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "UOM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductUOMConversion" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "fromUomId" TEXT NOT NULL,
    "toUomId" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductUOMConversion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "UOM_name_key" ON "UOM"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UOM_code_key" ON "UOM"("code");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_baseUomId_fkey" FOREIGN KEY ("baseUomId") REFERENCES "UOM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUOMConversion" ADD CONSTRAINT "ProductUOMConversion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUOMConversion" ADD CONSTRAINT "ProductUOMConversion_fromUomId_fkey" FOREIGN KEY ("fromUomId") REFERENCES "UOM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUOMConversion" ADD CONSTRAINT "ProductUOMConversion_toUomId_fkey" FOREIGN KEY ("toUomId") REFERENCES "UOM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
