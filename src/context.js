import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';


/**
 * Ce qui est important pour le cntext c'est le Provider et le Consumer
 */


const ProductContext = React.createContext();
const ProductConsumer = ProductContext.Consumer


 class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
    }

    /**
     * methode qui permet de faire une mise à jour automatique de mon state: lifecycle
     * 
     * Très important
     */

   componentDidMount(){
       this.setProducts();
   }
    setProducts = () =>{
      let temProducts = [];
      storeProducts.forEach(item => {
          const singleItem = {...item};
         temProducts = [...temProducts, singleItem]
      });
      this.setState(() =>{
          return { products:temProducts}
      })
    }


    /**
     * methode qui permet d'afficher un produit
     */
      
     // constante qui stocke l'id de chaque produit individuelement
     getItem = (id) => {
         const product = this.state.products.find(item => item.id ===id);
         return product;
     }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState({detailProduct:product});
    }


/**
 * Methode qui permet d'jouter un produit au corbeille des qu'on clique sur ce dernier qui sort de la carte produit
 * 
 * La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau. Si l'élément cherché n'est pas présent dans le tableau, la méthode renverra -1
 */
    addToCart = (id) => {
        //on fait une copie de tt le tableau
        let temProducts = [...this.state.products];
        // cherche le prmier indice de l'objet ds notre tableau
        const index = temProducts.indexOf(this.getItem(id));
        // on stocke l'index ds product
        const product = temProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        
        /**
         * On a fait cart: [...this.state.cart, product] pour metrre a jour la corbeille, la premiere foid , il ny a rien (...this.state.cart) et dés quon ajoute il se remet a jour cest pour ca qu'on a fait (, product)
         */
        this.setState(() => {
            return { products: temProducts,
                cart: [...this.state.cart, product]
            }   
            
        }, () => {
            this.addTotals()
        });
        
    };

    /**
     * Methode qui permet dés qu'on clique sur "inCart" ds le produit on voit aparaitre un modal qui fit un peti resumé de notre corbeille
     */

     openModal = (id) => {
         // On chope dabord 
         const product = this.getItem(id);
         this.setState(() => {
           return { modalProduct: product , modalOpen: true}
         });
     }

      /**
       * Methode qui permet de fermer le modal.
       */
     closeModal = () => {
      this.setState({modalOpen:false});
     }


      /**
       * methode qui permet d'augmenter le nombre d'un produit specifique ds la corbeille et d'ajuster automatiquement le prix également
       */
     increment = (id) => {
         let tempCart = [...this.state.cart];

         const selectedProduct = tempCart.find(item => item.id === id);

         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];

         product.count = product.count + 1 ;
         product.total = product.count * product.price;

         this.setState(() => {
             return{
                 cart: [...tempCart]
             }
         }, () => {
            this.addTotals()
         });
     }



     decrement = (id) => {
         let tempCart = [...this.state.cart];

         const selectedProduct = tempCart.find(item => item.id === id);

         const index = tempCart.indexOf(selectedProduct);
         const product = tempCart[index];

         product.count = product.count - 1;

         if(product.count === 0){
             this.removeItem(id);
         }else{
          
             product.total = product.count * product.price;

             this.setState(() => {
                 return {
                     cart: [...tempCart]
                 }
             }, () => {
                 this.addTotals()
             });
         }

        
        
     }

     /**
      * methode qui permet de supprimer un produit de sa corbeille
      * 
      * La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.
      */

     removeItem= (id) => {
         let tempProducts = [...this.state.products];
         let tempCart = [...this.state.cart];

         // je parcours mon tableau tempCart et je stocke QUE les id qui st differents de  mon id à supprimer. En gros je retourne un nouveau tableau qui ne contient QUE des élements sauf ceux supprimés!!
         tempCart = tempCart.filter(item => item.id !== id);

         const index = tempProducts.indexOf(this.getItem(id));

         let removedProduct = tempProducts[index];

         removedProduct.inCart = false;
         removedProduct.count = 0;
         removedProduct.total = 0;

         this.setState(() =>{
             return {
                 cart:[...tempCart],
                 product:[...tempProducts]
             }
         }, () =>{
             this.addTotals()
         })
     }

     /**
      * methode qui permet d'annuler ou de vider sa corbeille
      * si on ne fait pas la fonction call back sur le setState ( apres avoir reduit cart a un array vide on ne nettoie pas bien la corbeille) on remarqe que qd on revient sur la page des produits les produits ajoutés st tjrs persistés ds la corbeille
      * 
      * ------POUR EVEITER CA------------TRES IMPORTANT
      * On passe a  la fction call back notre tabaleau de produit mis a jours
      * THIS.SETPRODUCTS()
      */

     clearCart = () => {
         this.setState(() => {
           return { cart: []};
         }, () => {
             this.setProducts();
             this.addTotals();
         });
         
     }
     
     /**
      * la methode qui permet de mettre le total a jour a chaque fois qu'on rajoute un produit
      */
     addTotals = () => {
         let subTotal = 0;
         this.state.cart.map(item =>(subTotal += item.total));
         const tempTax = subTotal * 0.1;
         const tax = parseFloat(tempTax.toFixed(2));
         const total = subTotal + tax;

         this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
         });
     }

    render() {
        return (
            <ProductContext.Provider value={{
              ...this.state,
              handleDetail:this.handleDetail,
              addToCart:this.addToCart,
              openModal:this.openModal,
              closeModal:this.closeModal,
              increment:this.increment,
              decrement:this.decrement,
              removeItem:this.removeItem,
              clearCart:this.clearCart
            }}>
               {this.props.children} 
            </ProductContext.Provider>
        )
    }
};

export {ProductProvider,ProductConsumer};


