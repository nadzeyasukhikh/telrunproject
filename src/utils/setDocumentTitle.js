 export function setDocumentTitle(page) {
    switch (page) {
      case 'home':
        document.title = "Main Page";
        break;
      case 'category':
        document.title = "Categories";
        break;
      case 'product':
        document.title = "All products";
        break;
      case 'sale':
        document.title = "All sales";
        break;
        case 'shoppingCart':
            document.title = "Shopping cart";
            break;
            case 'productCart':
            document.title = "Product cart";
            break;
            case 'categoriesProduct':
            document.title = "Categories product";
            break;
      default:
        document.title = "Your Website Name";
    }
  }